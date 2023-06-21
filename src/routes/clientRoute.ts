import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from 'express';
import { generateJWT } from '../utils/jwt';
import ClientService from '../services/clientService';
import environment from '../environment';

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
        const jwtSecret: string = environment.JWT_SECRET as string;
        const jwtDurationInMinutes: number = parseInt(environment.JWT_DURATION_IN_MINUTES as string);
        // const jwt = generateJWT(existingClient[0].id + '', jwtDurationInMinutes, jwtSecret);
        const jwt = generateJWT(existingClient[0].id + '', jwtDurationInMinutes, xSecret);
        resp.status(200).json({ jwt });
      } else {
        resp.status(404).json({ message: `client_not_found: ${xClient}` });
      }
    } else {
      resp.status(404).json({ message: 'Bad Request' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
