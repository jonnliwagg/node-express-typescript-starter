import express, { Express, Request, Response } from 'express';
import environment from './environment';
import createServer from './server';
import SequelizeConnection from './database/configuration';
import { db } from './database/models';

(async () => {
  await SequelizeConnection.connect();

  // initialize models
  db.sequelize.sync({
    force: false,
  });
})();

const app: Express = express();
const appPort = environment.APP_PORT;

createServer(app).withSwagger().routes().start(appPort);

process.on('SIGINT', () => {
  SequelizeConnection.close();
  process.exit();
});
