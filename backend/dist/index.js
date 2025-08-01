"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDb_1 = require("./db/connectDb");
const app = (0, express_1.default)();
(0, connectDb_1.connectDb)();
app.get("/", (req, res) => {
    res.send("hello world");
});
app.listen(3000, () => {
    console.log("app is listening at port 3000");
});
