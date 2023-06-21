import express, { Express } from 'express';
import cors from 'cors';
import * as routes from './routes';
import authorizationMiddleware from './middlewares/authorizationMiddleware';
import morganMiddleware from './middlewares/morganMiddleware';
import logger from './logging/logger';
import errorHandler from './middlewares/errorMiddleware';
import * as swaggerUI from 'swagger-ui-express';
import { swaggerDocs } from './swagger';

class Server {
  private app: Express;

  constructor(app: Express) {
    if (!app) {
      throw new Error('Express instance is undefined.');
    }
    this.app = app;
    this.app.set('trust proxy', true);

    // middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morganMiddleware.config);
    this.app.use(authorizationMiddleware);
  }

  errorHandler() {
    this.app.use(errorHandler);
    return this;
  }

  routes() {
    this.app.use('/__gtg', routes.gtgRoute);
    this.app.use('/api', routes.apiRoutes);
    this.app.use('/', routes.clientRoute);
    return this;
  }

  withSwagger() {
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    return this;
  }

  start(port: string) {
    this.app.listen(port, () => {
      logger.info(`[server]: Server is listening at port ${port}`);
    });
  }
}

const createServer = (app: Express) => new Server(app);

export default createServer;
