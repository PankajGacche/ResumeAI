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
exports.addResume = addResume;
exports.myResumes = myResumes;
exports.getResume = getResume;
exports.setResumePending = setResumePending;
exports.setResumeFailure = setResumeFailure;
exports.setResumeSuccess = setResumeSuccess;
exports.saveResume = saveResume;
var mongodb_1 = require("mongodb");
var UserDAO_js_1 = require("./UserDAO.js");
var mongoClient;
function addResume(email, name, resumeModel) {
    return __awaiter(this, void 0, void 0, function () {
        var col, E_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    col = globalThis.mongoClient.db('resume_builder').collection('resumes');
                    return [4 /*yield*/, col.insertOne({ time: Date.now(), resumename: name, 'email': email, 'state': "success", "resumeModel": resumeModel })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    E_1 = _a.sent();
                    console.log("Error while adding user in DAO", E_1);
                    throw new Error("Couldn't Add Resume");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function myResumes(email) {
    return __awaiter(this, void 0, void 0, function () {
        var col, cursor, arr, _a, _b, E_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    col = globalThis.mongoClient.db('resume_builder').collection('resumes');
                    cursor = col.find({ email: email }, { projection: { _id: 1, resumename: 1, state: 1 } }).sort({ time: -1 });
                    arr = [];
                    _c.label = 1;
                case 1: return [4 /*yield*/, cursor.hasNext()];
                case 2:
                    if (!_c.sent()) return [3 /*break*/, 4];
                    _b = (_a = arr).push;
                    return [4 /*yield*/, cursor.next()];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, arr];
                case 5:
                    E_2 = _c.sent();
                    console.log("Error while adding user in DAO", E_2);
                    throw new Error("Couldn't Add Resume");
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getResume(resumeId) {
    return __awaiter(this, void 0, void 0, function () {
        var col, resume, E_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    col = globalThis.mongoClient.db('resume_builder').collection('resumes');
                    return [4 /*yield*/, col.findOne({ _id: new mongodb_1.ObjectId(resumeId) })];
                case 1:
                    resume = _a.sent();
                    if (resume == null)
                        throw new Error("Couldn't Find resume");
                    return [2 /*return*/, resume];
                case 2:
                    E_3 = _a.sent();
                    console.log(E_3);
                    throw new Error("Couldm't fetch resume");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function setResumePending(userEmail, resumeName) {
    return __awaiter(this, void 0, void 0, function () {
        var col, data, E_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, UserDAO_js_1.incrementResumes)(userEmail, -1)];
                case 1:
                    _a.sent();
                    col = globalThis.mongoClient.db('resume_builder').collection('resumes');
                    return [4 /*yield*/, col.insertOne({ time: Date.now(), resumename: resumeName, 'email': userEmail, 'state': "pending" })];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.insertedId.toString()];
                case 3:
                    E_4 = _a.sent();
                    console.log("Error while adding user in DAO", E_4);
                    throw new Error("Couldn't Add Resume");
                case 4: return [2 /*return*/];
            }
        });
    });
}
function setResumeFailure(id) {
    return __awaiter(this, void 0, void 0, function () {
        var col, E_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    col = globalThis.mongoClient.db('resume_builder').collection('resumes');
                    return [4 /*yield*/, col.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { 'state': 'failure' } })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    E_5 = _a.sent();
                    console.log("Error while Updating Resume", E_5);
                    throw new Error("Couldn't Updating Resume");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function setResumeSuccess(id, resumeModel) {
    return __awaiter(this, void 0, void 0, function () {
        var col, E_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    col = globalThis.mongoClient.db('resume_builder').collection('resumes');
                    return [4 /*yield*/, col.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { 'state': 'success', 'resumeModel': resumeModel } })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    E_6 = _a.sent();
                    console.log("Error while Updating Resume", E_6);
                    throw new Error("Couldn't Updating Resume");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function saveResume(resumeId, resumeModel) {
    return __awaiter(this, void 0, void 0, function () {
        var col, result, E_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    col = globalThis.mongoClient.db('resume_builder').collection('resumes');
                    return [4 /*yield*/, col.findOneAndUpdate({ _id: new mongodb_1.ObjectId(resumeId) }, { $set: { 'resumeModel': resumeModel } })];
                case 1:
                    result = _a.sent();
                    if (result.value == null)
                        throw new Error("coulnt Find Resume");
                    return [3 /*break*/, 3];
                case 2:
                    E_7 = _a.sent();
                    console.log(E_7);
                    throw new Error("Couldn't update resume");
                case 3: return [2 /*return*/];
            }
        });
    });
}
