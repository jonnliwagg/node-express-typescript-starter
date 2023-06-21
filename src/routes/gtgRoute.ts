import express, { Request, Response } from 'express';
import environment from '../environment';
import authorizationMiddleware from '../middlewares/authorizationMiddleware';

const router = express.Router();

router.get('/', (req: Request, resp: Response) => {
  resp.status(200).json({
    version: '1.0.0',
    status: 'up',
    environment: environment.APP_ENVIRONMENT,
  });
});

export default router;
