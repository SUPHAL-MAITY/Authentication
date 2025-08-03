"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// interface customRequest  extends Request{
//     user?:{
//         email:String
//     }
// }
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "token not available" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        console.log("decoded", decoded);
        req.user = { email: decoded === null || decoded === void 0 ? void 0 : decoded.email };
    }
    catch (error) {
        return res.status(400).json({ message: "error while authenticating in middleware" });
    }
    next();
};
exports.auth = auth;
