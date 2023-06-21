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
const models_1 = require("../database/models");
const client_1 = __importDefault(require("../database/models/client"));
class ClientService {
    constructor() {
        this.verifyUser = (name, key) => __awaiter(this, void 0, void 0, function* () {
            const clients = yield models_1.db.Client.findAll({ where: { name, key } });
            console.log(clients);
            return clients;
        });
        // findUser = async (id: ) => {
        //   const clients: Client[] = await db.Client.findAll({ where: { name, key } });
        //   return clients;
        // };
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const existingClient = yield models_1.db.Client.findByPk(id);
            return existingClient;
        });
        //   findOne = async (name: string, key: string) => {
        //     const existingClient: Client | null = await db.Client.findOne({
        //       where: { name, key },
        //     });
        //     return existingClient;
        //   };
        this.save = (object) => __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line no-useless-catch
            try {
                if (!object && Object.keys(object).length == 0) {
                    throw new Error('Object must contain at least one property');
                }
                const client = yield client_1.default.create(Object.assign({}, object));
                return client;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getInstance() {
        if (!ClientService.instance) {
            ClientService.instance = new ClientService();
        }
        return ClientService.instance;
    }
}
exports.default = ClientService;
