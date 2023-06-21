import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from 'express';

import ClientService from '../services/clientService';

const router = express.Router();

router.post('/', async (req: Request, resp: Response, next: NextFunction) => {
  console.log(req.headers);

  try {
    const payload = {
      name: req.headers['x-client'],
      key: req.headers['x-secret'],
    };
    const newClient = await ClientService.getInstance().save(payload);
    resp.status(201).json({ ...newClient.dataValues });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const xClient = req.headers['x-client'];
    const xSecret = req.headers['x-secret'];
    if (typeof xClient === 'string' && typeof xSecret === 'string') {
      const existingClient = await ClientService.getInstance().verifyUser(
        xClient,
        xSecret
      );
      if (existingClient.length > 0) {
        resp.status(200).json(existingClient);
      } else {
        resp
          .status(404)
          .json({ message: `client_not_found: ${xClient}` });
      }
    } else {
      resp.status(404).json({ message: 'Bad Request' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
