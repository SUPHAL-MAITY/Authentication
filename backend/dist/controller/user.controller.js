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
exports.loginController = exports.registerController = exports.getUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_schema_1 = require("../Schema/User.schema");
const secret = "djfo99349";
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt_1.default.hash(password, 10);
    return hashed;
});
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, hash);
    return isPasswordCorrect;
});
const token = (email) => {
    return jsonwebtoken_1.default.sign({ email: email }, secret, { expiresIn: "24h" });
};
const getUserController = (req, res) => {
    res.send("user obtained");
};
exports.getUserController = getUserController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
        const existedUser = yield User_schema_1.User.findOne({ email });
        console.log("existedUser", existedUser);
        if (existedUser) {
            return res.status(400).json({ message: "user exists before" });
        }
        const hasedPassword = yield hashPassword(password);
        const user = yield User_schema_1.User.create({ name, email, password: hasedPassword });
        if (!user) {
            return res.status(400).json({ message: "user not created successfully" });
        }
        return res.status(200).json({ message: "user created sucessfully", user });
    }
    catch (error) {
        return res.status(400).json({ message: "There is some error while creating user" });
    }
    return;
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_schema_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "user does not exist " });
        }
        const isPasswordCorrect = yield comparePassword(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "invalid credentials " });
        }
        let tokenString = token(email);
        res.status(200).cookie("token", tokenString).json({ message: "user logged in successfully", user, token: tokenString });
    }
    catch (error) {
        return res.status(400).json({ message: "Error while logging in " });
    }
    return;
});
exports.loginController = loginController;
