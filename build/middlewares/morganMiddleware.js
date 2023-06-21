"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("../logging/logger");
morgan_1.default.token('date', () => {
    return logger_1.logConfiguration.morgan.dateFormat;
});
exports.default = {
    config: (0, morgan_1.default)(logger_1.logConfiguration.morgan.logFormat, {
        stream: logger_1.logConfiguration.morgan.stream,
    }),
};
