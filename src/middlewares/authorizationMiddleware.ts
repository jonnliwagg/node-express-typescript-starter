import { Request, Response, NextFunction } from 'express';

function authorizationMiddleware(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  const urlPath = req.url;
  const authorizationToken = req.headers['authorization'];
  if (urlPath.startsWith('/api') && !authorizationToken) {
    resp.status(401).json({ message: 'invalid_authorization_token' });
    return;
  }
  next();
}

export default authorizationMiddleware;
