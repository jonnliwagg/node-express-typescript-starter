"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environment_1 = __importDefault(require("../environment"));
const logger_1 = __importDefault(require("../logging/logger"));
class SequelizeConnection {
    static getInstance() {
        if (!SequelizeConnection.instance) {
            SequelizeConnection.instance = new sequelize_1.Sequelize(environment_1.default.DB_SCHEMA, environment_1.default.DB_USERNAME, environment_1.default.DB_PASSWORD, {
                host: environment_1.default.DB_HOST,
                port: parseInt(environment_1.default.DB_PORT),
                dialect: environment_1.default.DB_DIALECT,
                pool: {
                    min: 10,
                    max: 20,
                    acquire: 30000,
                    idle: 10000,
                },
                logging: environment_1.default.APP_ENVIRONMENT !== 'production' ? console.log : false,
                define: {
                    freezeTableName: true,
                },
            });
        }
        return SequelizeConnection.instance;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = SequelizeConnection.getInstance();
            try {
                yield sequelize.authenticate();
                logger_1.default.info('Database connection authenticated successfully');
                return sequelize;
            }
            catch (err) {
                logger_1.default.error('Error while creation connection to database :: ' + err.message);
                return sequelize;
            }
        });
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = SequelizeConnection.getInstance();
            try {
                yield sequelize.close();
                logger_1.default.info('Database connection closed successfully');
                return sequelize;
            }
            catch (err) {
                logger_1.default.error('Error while closing database connection :: ' + err.message);
                return sequelize;
            }
        });
    }
}
exports.default = SequelizeConnection;
