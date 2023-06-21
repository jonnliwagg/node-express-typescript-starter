"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const environment_1 = __importDefault(require("./environment"));
const swaggerDefinition = {
    info: {
        title: 'Node API',
        description: 'RESTful API Documentation',
        version: environment_1.default.APP_VERSION,
    },
    host: `${environment_1.default.APP_HOST}:${environment_1.default.APP_PORT}`,
    basePath: '/',
    schemes: ['http', 'https'],
};
const options = {
    swaggerDefinition,
    apis: ['./docs/**/*.yaml'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(options);
exports.swaggerDocs = swaggerDocs;
