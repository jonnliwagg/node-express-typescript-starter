"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logging/logger"));
const errorHandler = (err, req, res) => {
    if (err) {
        logger_1.default.error(`${req.method}: ${req.url} - ${err.message}`);
        res.status(500).json({ message: err.message });
    }
};
exports.default = errorHandler;
