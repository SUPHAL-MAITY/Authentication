"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDb_1 = require("./db/connectDb");
const user_controller_1 = require("./controller/user.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connectDb_1.connectDb)();
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/user", user_controller_1.getUserController);
app.post("/register", user_controller_1.registerController);
app.listen(3000, () => {
    console.log("app is listening at port 3000");
});
