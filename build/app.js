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
const express_1 = __importDefault(require("express"));
const environment_1 = __importDefault(require("./environment"));
const server_1 = __importDefault(require("./server"));
const configuration_1 = __importDefault(require("./database/configuration"));
const models_1 = require("./database/models");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield configuration_1.default.connect();
    // initialize models
    models_1.db.sequelize.sync({
        force: false,
    });
}))();
const app = (0, express_1.default)();
const appPort = environment_1.default.APP_PORT;
(0, server_1.default)(app).withSwagger().routes().start(appPort);
process.on('SIGINT', () => {
    configuration_1.default.close();
    process.exit();
});
