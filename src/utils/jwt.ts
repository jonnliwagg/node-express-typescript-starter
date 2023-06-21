import { createHmac } from 'crypto';

const header = {
  alg: 'HS256',
  typ: 'JWT',
};

export const toBase64 = (obj: any): string => {
  // converts the obj to a string
  const str = JSON.stringify(obj);
  // returns string converted to base64
  return Buffer.from(str).toString('base64');
};

export const decodeBase64 = (base64Str: string): string => {
  const buff = new Buffer(base64Str, 'base64');
  return buff.toString('ascii');
};

export const createSignature = (
  jwtB64Header: string,
  jwtB64Payload: string,
  secret: string
): string => {
  // create a HMAC(hash based message authentication code) using sha256 hashing alg
  const signature = createHmac('sha256', secret);

  // use the update method to hash a string formed from our jwtB64Header a period and
  //jwtB64Payload
  signature.update(jwtB64Header + '.' + jwtB64Payload);

  //of course we need to clean the base64 string of URL special characters
  return signature.digest('base64');
};

export const verifyJWT = (jwt: string, secret: string): boolean => {
  const tokens = jwt.split('.');
  if (tokens.length !== 3) return false;
  const [jwtHeader, jwtPayload, jwtSignature] = tokens;
  const payload = extractPayload(jwt);
  const expireDateUnixTimestamp: number = payload['expireAt'] as number;
  console.log(expireDateUnixTimestamp);
  
  const expireDate: Date = new Date(expireDateUnixTimestamp);
  const now: Date = new Date();
  console.log(`current: ${now}`);
  console.log(`expireTime: ${expireDate}`);
  
  if(now > expireDate) {
    return false;
  }
  const legitSignature = replaceSpecialChars(
    createSignature(jwtHeader, jwtPayload, secret)
  );
  return legitSignature === jwtSignature;
};

export const generateJWT = (
  id: string,
  durationInMin: number,
  secret: string
): string => {
  const now: Date = new Date();
  const expiry: Date = new Date();
  expiry.setMinutes(now.getMinutes() + durationInMin);
  const expiryUnix = expiry.getTime();
  const payload = {
    id,
    expireAt: expiryUnix,
  };

  const encodedHeader = replaceSpecialChars(toBase64(header));
  const encodePayload = replaceSpecialChars(toBase64(payload));
  const signature = replaceSpecialChars(
    createSignature(encodedHeader, encodePayload, secret)
  );
  return `${encodedHeader}.${encodePayload}.${signature}`;
};

const replaceSpecialChars = (b64string: any): string => {
  // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
  return b64string.replace(/[=+/]/g, (charToBeReplaced: string) => {
    switch (charToBeReplaced) {
      case '=':
        return '';
      case '+':
        return '-';
      case '/':
        return '_';
    }
  });
};

export const extractPayload = (jwt: string): any => {
  const tokens = jwt.split('.');
  if (tokens.length !== 3) return false;
  const [jwtHeader, jwtPayload, jwtSignature] = tokens;
  const encodedPayload = decodeBase64(jwtPayload);
  return JSON.parse(encodedPayload);
};

// const replaceSpecialChars = (b64string: string): string => {
//   // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
//   return b64string.replace(/[=+/]/g, (charToBeReplaced:string) => {
//     switch (charToBeReplaced) {
//       case '=':
//         return '';
//       case '+':
//         return '-';
//       case '/':
//         return '_';
//     }
//   });
// };
