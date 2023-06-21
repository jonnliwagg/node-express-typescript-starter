import { Request, Response, NextFunction } from 'express';
import {
  generateJWT,
  verifyJWT,
  decodeBase64,
  extractPayload,
} from '../utils/jwt';
import ClientService from '../services/clientService';
import environment from '../environment';
import Client from '../database/models/client';

// function authorizationMiddleware(
//   req: Request,
//   resp: Response,
//   next: NextFunction
// ) {
//   const urlPath = req.url;

//   if (urlPath.startsWith('/api')) {
//     const authorizationToken = req.headers['authorization'];
//     const secret = environment.JWT_SECRET as string;
//     if (typeof authorizationToken !== 'string') {
//       resp.status(401).json({ message: 'invalid_authorization_token' });
//       return;
//     }
//     const authorizationTokens: string[] = authorizationToken.split(' ');
//     if (authorizationTokens.length !== 2) {
//       resp.status(401).json({ message: 'malformed_authorization_header' });
//       return;
//     }
//     const [identifier, jwt] = authorizationTokens;
//     if (identifier !== 'Bearer') {
//       resp
//         .status(401)
//         .json({ message: 'malformed_authorization_header_identifier' });
//       return;
//     }
//     if (!verifyJWT(jwt, secret)) {
//       resp.status(401).json({ message: 'invalid_jwt_token' });
//       return;
//     }
//   }
//   next();
// }

async function authorizationMiddleware(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  const urlPath = req.url;

  if (urlPath.startsWith('/api')) {
    const authorizationToken = req.headers['authorization'];
    const secret = environment.JWT_SECRET as string;
    if (typeof authorizationToken !== 'string') {
      resp.status(401).json({ message: 'invalid_authorization_token' });
      return;
    }
    const authorizationTokens: string[] = authorizationToken.split(' ');
    if (authorizationTokens.length !== 2) {
      resp.status(401).json({ message: 'malformed_authorization_header' });
      return;
    }
    const [identifier, jwt] = authorizationTokens;
    if (identifier !== 'Bearer') {
      resp
        .status(401)
        .json({ message: 'malformed_authorization_header_identifier' });
      return;
    }
    const payload = extractPayload(jwt);
    const userId:number = parseInt(payload['id']);
    const client: Client| null = await ClientService.getInstance().findById(userId);
    if(!client) {
      resp.status(401).json({ message: 'invalid_jwt_token_client' });
      return;
    }
    const clientSecret: string = client.key;
    if (verifyJWT(jwt, clientSecret)) {
      next();
    } else {
      resp.status(401).json({ message: 'invalid_jwt_token' });
      return;
    }
  } else {
    next();
  }
}

export default authorizationMiddleware;
