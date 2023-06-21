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
exports.logConfiguration = void 0;
const winston_1 = __importDefault(require("winston"));
const moment_1 = __importDefault(require("moment"));
require("winston-daily-rotate-file");
const FileStreamRotator = __importStar(require("file-stream-rotator"));
const path_1 = __importDefault(require("path"));
exports.logConfiguration = {
    morgan: {
        stream: FileStreamRotator.getStream({
            date_format: 'YYYY-MM-DD',
            filename: path_1.default.join(__dirname, '../../logs', 'access.%DATE%.log'),
            frequency: 'daily',
            verbose: false,
        }),
        logFormat: ':date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms',
        dateFormat: (0, moment_1.default)().format(' HH:mm:ss.ms'),
    },
    winston: {
        transports: [
            new winston_1.default.transports.Console({
                level: 'verbose',
            }),
            new winston_1.default.transports.DailyRotateFile({
                filename: './logs/application.%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                level: 'verbose',
                maxFiles: '5d',
            }),
        ],
        format: winston_1.default.format.combine(winston_1.default.format.label({
            label: 'node-api',
        }), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf((info) => {
            return `[${info.level}]-${info.label}: ${info.timestamp} - ${info.message}`;
        })),
    },
};
exports.default = winston_1.default.createLogger(exports.logConfiguration.winston);
