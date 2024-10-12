"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var fs_1 = require("fs");
var UserRouter_js_1 = require("./routers/UserRouter.js");
var ResumeRouter_js_1 = require("./routers/ResumeRouter.js");
var InjectUser_js_1 = require("./middleware/InjectUser.js");
var cookie_parser_1 = require("cookie-parser");
globalThis.mongoClient = new mongodb_1.MongoClient(process.env.MONGO_URL);
if (!(0, fs_1.existsSync)('generated'))
    (0, fs_1.mkdirSync)('generated');
var app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
app.use('/', InjectUser_js_1.InjectUser);
app.use('/api/user', UserRouter_js_1.userRouter);
app.use('/api/resume/', ResumeRouter_js_1.resumeRouter);
app.listen(4292, function () {
    console.log("Listening At Port 4292");
});
