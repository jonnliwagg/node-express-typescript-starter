import { Sequelize, Dialect } from 'sequelize';
import env from '../environment';
import logger from '../logging/logger';

class SequelizeConnection {
  private static instance: Sequelize;

  static getInstance(): Sequelize {
    if (!SequelizeConnection.instance) {
      SequelizeConnection.instance = new Sequelize(
        env.DB_SCHEMA!,
        env.DB_USERNAME!,
        env.DB_PASSWORD,
        {
          host: env.DB_HOST,
          port: parseInt(env.DB_PORT!),
          dialect: env.DB_DIALECT as Dialect,
          pool: {
            min: 10,
            max: 20,
            acquire: 30_000,
            idle: 10_000,
          },
          logging: env.APP_ENVIRONMENT !== 'production' ? console.log : false,
          define: {
            freezeTableName: true,
          },
        }
      );
    }
    return SequelizeConnection.instance;
  }

  static async connect(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.authenticate();
      logger.info('Database connection authenticated successfully');
      return sequelize;
    } catch (err: any) {
      logger.error(
        'Error while creation connection to database :: ' + err.message
      );
      return sequelize;
    }
  }

  static async close(): Promise<Sequelize> {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.close();
      logger.info('Database connection closed successfully');
      return sequelize;
    } catch (err: any) {
      logger.error('Error while closing database connection :: ' + err.message);
      return sequelize;
    }
  }
}

export default SequelizeConnection;
