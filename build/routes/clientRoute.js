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
const clientService_1 = __importDefault(require("../services/clientService"));
const router = express_1.default.Router();
router.post('/', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    try {
        const payload = {
            name: req.headers['x-client'],
            key: req.headers['x-secret'],
        };
        const newClient = yield clientService_1.default.getInstance().save(payload);
        resp.status(201).json(Object.assign({}, newClient.dataValues));
    }
    catch (err) {
        next(err);
    }
}));
router.get('/', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const xClient = req.headers['x-client'];
        const xSecret = req.headers['x-secret'];
        if (typeof xClient === 'string' && typeof xSecret === 'string') {
            const existingClient = yield clientService_1.default.getInstance().verifyUser(xClient, xSecret);
            if (existingClient.length > 0) {
                resp.status(200).json(existingClient);
            }
            else {
                resp
                    .status(404)
                    .json({ message: `client_not_found: ${xClient}` });
            }
        }
        else {
            resp.status(404).json({ message: 'Bad Request' });
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
