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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = {
    APP_PORT: (_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : '5555',
    APP_HOST: (_b = process.env.APP_HOST) !== null && _b !== void 0 ? _b : 'localhost',
    APP_ENVIRONMENT: (_c = process.env.APP_ENVIRONMENT) !== null && _c !== void 0 ? _c : 'local',
    APP_VERSION: (_d = process.env.APP_VERSION) !== null && _d !== void 0 ? _d : '1.0.0',
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_SCHEMA: process.env.DB_SCHEMA,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_DURATION_IN_MINUTES: process.env.JWT_DURATION_IN_MINUTES,
};
