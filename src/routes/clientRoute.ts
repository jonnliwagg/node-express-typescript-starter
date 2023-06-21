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

export default router;
// router.get('/:id', async (req: Request, resp: Response, next: NextFunction) => {
//     try {
//       const existingClient = await ClientService.getInstance().findById(
//         parseInt(req.params.id)
//       );
//       if (existingClient) {
//         resp.status(200).json(existingClient);
//       } else {
//         resp
//           .status(404)
//           .json({ message: `client_not_found: ${req.params.id}` });
//       }
//     } catch (err) {
//       next(err);
//     }
//   });
