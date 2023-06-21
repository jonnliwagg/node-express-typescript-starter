import swaggerJSDoc from 'swagger-jsdoc';
import environment from './environment';

const swaggerDefinition = {
  info: {
    title: 'Node API',
    description: 'RESTful API Documentation',
    version: environment.APP_VERSION,
  },
  host: `${environment.APP_HOST}:${environment.APP_PORT}`,
  basePath: '/',
  schemes: ['http', 'https'],
};

const options = {
  swaggerDefinition,
  apis: ['./docs/**/*.yaml'],
};

const swaggerDocs = swaggerJSDoc(options);
export { swaggerDocs };
