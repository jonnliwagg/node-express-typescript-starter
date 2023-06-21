"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPayload = exports.generateJWT = exports.verifyJWT = exports.createSignature = exports.decodeBase64 = exports.toBase64 = void 0;
const crypto_1 = require("crypto");
const header = {
    alg: 'HS256',
    typ: 'JWT',
};
const toBase64 = (obj) => {
    // converts the obj to a string
    const str = JSON.stringify(obj);
    // returns string converted to base64
    return Buffer.from(str).toString('base64');
};
exports.toBase64 = toBase64;
const decodeBase64 = (base64Str) => {
    const buff = new Buffer(base64Str, 'base64');
    return buff.toString('ascii');
};
exports.decodeBase64 = decodeBase64;
const createSignature = (jwtB64Header, jwtB64Payload, secret) => {
    // create a HMAC(hash based message authentication code) using sha256 hashing alg
    const signature = (0, crypto_1.createHmac)('sha256', secret);
    // use the update method to hash a string formed from our jwtB64Header a period and
    //jwtB64Payload
    signature.update(jwtB64Header + '.' + jwtB64Payload);
    //of course we need to clean the base64 string of URL special characters
    return signature.digest('base64');
};
exports.createSignature = createSignature;
const verifyJWT = (jwt, secret) => {
    const tokens = jwt.split('.');
    if (tokens.length !== 3)
        return false;
    const [jwtHeader, jwtPayload, jwtSignature] = tokens;
    const payload = (0, exports.extractPayload)(jwt);
    const expireDateUnixTimestamp = payload['expireAt'];
    console.log(expireDateUnixTimestamp);
    const expireDate = new Date(expireDateUnixTimestamp);
    const now = new Date();
    console.log(`current: ${now}`);
    console.log(`expireTime: ${expireDate}`);
    if (now > expireDate) {
        return false;
    }
    const legitSignature = replaceSpecialChars((0, exports.createSignature)(jwtHeader, jwtPayload, secret));
    return legitSignature === jwtSignature;
};
exports.verifyJWT = verifyJWT;
const generateJWT = (id, durationInMin, secret) => {
    const now = new Date();
    const expiry = new Date();
    expiry.setMinutes(now.getMinutes() + durationInMin);
    const expiryUnix = expiry.getTime();
    const payload = {
        id,
        expireAt: expiryUnix,
    };
    const encodedHeader = replaceSpecialChars((0, exports.toBase64)(header));
    const encodePayload = replaceSpecialChars((0, exports.toBase64)(payload));
    const signature = replaceSpecialChars((0, exports.createSignature)(encodedHeader, encodePayload, secret));
    return `${encodedHeader}.${encodePayload}.${signature}`;
};
exports.generateJWT = generateJWT;
const replaceSpecialChars = (b64string) => {
    // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
    return b64string.replace(/[=+/]/g, (charToBeReplaced) => {
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
const extractPayload = (jwt) => {
    const tokens = jwt.split('.');
    if (tokens.length !== 3)
        return false;
    const [jwtHeader, jwtPayload, jwtSignature] = tokens;
    const encodedPayload = (0, exports.decodeBase64)(jwtPayload);
    return JSON.parse(encodedPayload);
};
exports.extractPayload = extractPayload;
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
