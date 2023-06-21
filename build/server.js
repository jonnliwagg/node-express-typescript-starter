"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes = __importStar(require("./routes"));
const authorizationMiddleware_1 = __importDefault(require("./middlewares/authorizationMiddleware"));
const morganMiddleware_1 = __importDefault(require("./middlewares/morganMiddleware"));
const logger_1 = __importDefault(require("./logging/logger"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const swaggerUI = __importStar(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
class Server {
    constructor(app) {
        if (!app) {
            throw new Error('Express instance is undefined.');
        }
        this.app = app;
        this.app.set('trust proxy', true);
        // middlewares
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(morganMiddleware_1.default.config);
        this.app.use(authorizationMiddleware_1.default);
    }
    errorHandler() {
        this.app.use(errorMiddleware_1.default);
        return this;
    }
    routes() {
        this.app.use('/__gtg', routes.gtgRoute);
        this.app.use('/api', routes.apiRoutes);
        this.app.use('/', routes.clientRoute);
        return this;
    }
    withSwagger() {
        this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger_1.swaggerDocs));
        return this;
    }
    start(port) {
        this.app.listen(port, () => {
            logger_1.default.info(`[server]: Server is listening at port ${port}`);
        });
    }
}
const createServer = (app) => new Server(app);
exports.default = createServer;
