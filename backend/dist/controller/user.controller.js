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
exports.registerController = exports.getUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_schema_1 = require("../Schema/User.schema");
const salt = "dojhfojdofj";
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt_1.default.hash(password, 10);
    return hashed;
});
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
