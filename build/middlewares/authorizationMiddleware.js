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
const jwt_1 = require("../utils/jwt");
const clientService_1 = __importDefault(require("../services/clientService"));
const environment_1 = __importDefault(require("../environment"));
// function authorizationMiddleware(
//   req: Request,
//   resp: Response,
//   next: NextFunction
// ) {
//   const urlPath = req.url;
//   if (urlPath.startsWith('/api')) {
//     const authorizationToken = req.headers['authorization'];
//     const secret = environment.JWT_SECRET as string;
//     if (typeof authorizationToken !== 'string') {
//       resp.status(401).json({ message: 'invalid_authorization_token' });
//       return;
//     }
//     const authorizationTokens: string[] = authorizationToken.split(' ');
//     if (authorizationTokens.length !== 2) {
//       resp.status(401).json({ message: 'malformed_authorization_header' });
//       return;
//     }
//     const [identifier, jwt] = authorizationTokens;
//     if (identifier !== 'Bearer') {
//       resp
//         .status(401)
//         .json({ message: 'malformed_authorization_header_identifier' });
//       return;
//     }
//     if (!verifyJWT(jwt, secret)) {
//       resp.status(401).json({ message: 'invalid_jwt_token' });
//       return;
//     }
//   }
//   next();
// }
function authorizationMiddleware(req, resp, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlPath = req.url;
        if (urlPath.startsWith('/api')) {
            const authorizationToken = req.headers['authorization'];
            const secret = environment_1.default.JWT_SECRET;
            if (typeof authorizationToken !== 'string') {
                resp.status(401).json({ message: 'invalid_authorization_token' });
                return;
            }
            const authorizationTokens = authorizationToken.split(' ');
            if (authorizationTokens.length !== 2) {
                resp.status(401).json({ message: 'malformed_authorization_header' });
                return;
            }
            const [identifier, jwt] = authorizationTokens;
            if (identifier !== 'Bearer') {
                resp
                    .status(401)
                    .json({ message: 'malformed_authorization_header_identifier' });
                return;
            }
            const payload = (0, jwt_1.extractPayload)(jwt);
            const userId = parseInt(payload['id']);
            const client = yield clientService_1.default.getInstance().findById(userId);
            if (!client) {
                resp.status(401).json({ message: 'invalid_jwt_token_client' });
                return;
            }
            const clientSecret = client.key;
            if ((0, jwt_1.verifyJWT)(jwt, clientSecret)) {
                next();
            }
            else {
                resp.status(401).json({ message: 'invalid_jwt_token' });
                return;
            }
        }
        else {
            next();
        }
    });
}
exports.default = authorizationMiddleware;
