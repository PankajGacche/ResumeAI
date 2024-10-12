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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addResumeEndpoint = addResumeEndpoint;
exports.getMyResumesEndpoint = getMyResumesEndpoint;
exports.getResumeEndpoint = getResumeEndpoint;
exports.addResumeOpenAIEndpoint = addResumeOpenAIEndpoint;
exports.saveResumeEndpoint = saveResumeEndpoint;
exports.sendResumeToEmailEndpoint = sendResumeToEmailEndpoint;
var ResumeDAO_js_1 = require("../DAO/ResumeDAO.js");
var UserDAO_js_1 = require("../DAO/UserDAO.js");
var FetchPDF_js_1 = require("../fetchPdf/FetchPDF.js");
var OpenAI_js_1 = require("../resume/OpenAI.js");
var ResumeGenerator_js_1 = require("../resume/ResumeGenerator.js");
var SampleData_js_1 = require("../sampleData/SampleData.js");
function addResumeEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, resumename, email, userName, userEmail, resumeModel, E_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false, data: {}, message: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    resumename = req.body.resumename;
                    email = req.body.email;
                    userName = req.body.name;
                    userEmail = res.locals.user.email;
                    if (userEmail == null)
                        throw new Error("Cant't Find User");
                    SampleData_js_1.sampleData["name"] = userName;
                    SampleData_js_1.sampleData["email"] = email;
                    return [4 /*yield*/, (0, ResumeGenerator_js_1.generateBasicResume)(SampleData_js_1.sampleData)];
                case 2:
                    resumeModel = _a.sent();
                    return [4 /*yield*/, (0, ResumeDAO_js_1.addResume)(userEmail, resumename, resumeModel)];
                case 3:
                    _a.sent();
                    result.message = "Succesfully Added Resume";
                    result.success = true;
                    return [3 /*break*/, 5];
                case 4:
                    E_1 = _a.sent();
                    console.log(E_1);
                    result.success = false;
                    result.message = "Couldn't Add Resume";
                    return [3 /*break*/, 5];
                case 5:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function getMyResumesEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, userEmail, data, E_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false, data: [], message: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (res.locals.user == null)
                        throw new Error("Cant Fin User");
                    userEmail = res.locals.user.email;
                    return [4 /*yield*/, (0, ResumeDAO_js_1.myResumes)(userEmail)];
                case 2:
                    data = _a.sent();
                    result.success = true;
                    result.data = data;
                    return [3 /*break*/, 4];
                case 3:
                    E_2 = _a.sent();
                    console.log(E_2);
                    result.success = false;
                    result.message = "Couldn't Get ";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function getResumeEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, resume, data, E_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false, data: {}, message: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    resume = req.params.resumeId;
                    if (resume == null)
                        throw new Error("Fields Missing");
                    return [4 /*yield*/, (0, ResumeDAO_js_1.getResume)(resume)];
                case 2:
                    data = _a.sent();
                    result.success = true;
                    result.data = data;
                    return [3 /*break*/, 4];
                case 3:
                    E_3 = _a.sent();
                    console.log(E_3);
                    result.success = false;
                    result.message = "An Error Occured";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function addResumeOpenAIEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, resumename, userEmail_1, resumeDescription, user, id_1, E_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false, data: {}, message: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    resumename = req.body.resumename;
                    userEmail_1 = res.locals.user.email;
                    resumeDescription = req.body.resumedescription;
                    return [4 /*yield*/, (0, UserDAO_js_1.getUser)(userEmail_1)];
                case 2:
                    user = _a.sent();
                    if (user == null)
                        throw new Error("Cant't Find User");
                    if (!(user.aiResumesLeft == 0)) return [3 /*break*/, 3];
                    result.success = false;
                    result.message = "No Resume Balance, Please Subscribe.";
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, (0, ResumeDAO_js_1.setResumePending)(userEmail_1, resumename)];
                case 4:
                    id_1 = _a.sent();
                    (0, OpenAI_js_1.generateOpenAIJson)(resumeDescription, 3).then(function (data) { return (0, ResumeGenerator_js_1.generateBasicResume)(data); })
                        .then(function (resumeModel) { return (0, ResumeDAO_js_1.setResumeSuccess)(id_1, resumeModel); }).catch(function (err) {
                        (0, UserDAO_js_1.incrementResumes)(userEmail_1, 1);
                        (0, ResumeDAO_js_1.setResumeFailure)(id_1);
                    });
                    result.message = "Succesfully Added Resume";
                    result.success = true;
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    E_4 = _a.sent();
                    console.log("Couldn't Find User.");
                    result.success = false;
                    result.message = "Couldn't Add Resume";
                    return [3 /*break*/, 7];
                case 7:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function saveResumeEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, E_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false, message: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (req.body.resumeId == null || req.body.resumeModel == null)
                        throw new Error("Invalid Request Format");
                    result.success = true;
                    return [4 /*yield*/, (0, ResumeDAO_js_1.saveResume)(req.body.resumeId, req.body.resumeModel)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    E_5 = _a.sent();
                    console.log(E_5);
                    result.success = false;
                    result.message = "An Error Occured";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function sendResumeToEmailEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, userEmail, resumeId, resume, E_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false, message: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    userEmail = req.body.email;
                    resumeId = req.body.resumeId;
                    if (!(userEmail == null || resumeId == null)) return [3 /*break*/, 2];
                    result.success = false;
                    result.message = "An Error Occurred! Missing Email Or ResumeId.";
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, (0, ResumeDAO_js_1.getResume)(resumeId)];
                case 3:
                    resume = _a.sent();
                    return [4 /*yield*/, (0, FetchPDF_js_1.sendPDFToEmail)(resumeId, userEmail)];
                case 4:
                    _a.sent();
                    result.success = true;
                    result.message = "Email Sent! Check Your Inbox";
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    E_6 = _a.sent();
                    result.success = false;
                    result.message = "An Error Occured";
                    return [3 /*break*/, 7];
                case 7:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
