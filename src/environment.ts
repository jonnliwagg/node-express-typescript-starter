import * as dotenv from 'dotenv';

dotenv.config();

export default {
  APP_PORT: process.env.APP_PORT ?? '5555',
  APP_HOST: process.env.APP_HOST ?? 'localhost',
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT ?? 'local',
  APP_VERSION: process.env.APP_VERSION ?? '1.0.0',
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_SCHEMA: process.env.DB_SCHEMA,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_DURATION_IN_MINUTES: process.env.JWT_DURATION_IN_MINUTES,
};
