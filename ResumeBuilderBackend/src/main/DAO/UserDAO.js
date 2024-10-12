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
exports.addUser = addUser;
exports.containsUser = containsUser;
exports.getUser = getUser;
exports.validateUser = validateUser;
exports.addSubscription = addSubscription;
exports.incrementResumes = incrementResumes;
function addUser(email, name, password) {
    return __awaiter(this, void 0, void 0, function () {
        var col, E_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, containsUser(email)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 2];
                    return [2 /*return*/, false];
                case 2:
                    col = globalThis.mongoClient.db('resume_builder').collection('users');
                    return [4 /*yield*/, col.insertOne({ 'name': name, 'email': email, password: password, isPremium: false, aiResumesLeft: 0 })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4: return [3 /*break*/, 6];
                case 5:
                    E_1 = _a.sent();
                    console.log("Error while adding user in DAO", E_1);
                    throw new Error("Couldn't add User");
                case 6: return [2 /*return*/];
            }
        });
    });
}
function containsUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var db, col, count, E_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    db = globalThis.mongoClient.db('resume_builder');
                    col = db.collection('users');
                    return [4 /*yield*/, col.countDocuments({ email: email })];
                case 1:
                    count = _a.sent();
                    if (count > 0) {
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    E_2 = _a.sent();
                    console.log("Error while checking contains user in DAO", E_2);
                    throw new Error("Couldn't check contains User");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var data, user, E_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, containsUser(email)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, globalThis.mongoClient.db('resume_builder').collection('users').findOne({ email: email })];
                case 2:
                    data = (_a.sent());
                    if (data == null)
                        return [2 /*return*/, null];
                    user = { email: email, name: data.name, password: data.password,
                        isPremium: data.isPremium ? data.isPremium : false,
                        aiResumesLeft: data.aiResumesLeft ? data.aiResumesLeft : 0
                    };
                    return [2 /*return*/, user];
                case 3: return [2 /*return*/, null];
                case 4: return [3 /*break*/, 6];
                case 5:
                    E_3 = _a.sent();
                    console.log("Error while getting user");
                    throw new Error("Couln't Fetch user getUser DAO");
                case 6: return [2 /*return*/];
            }
        });
    });
}
function validateUser(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, E_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUser(email)];
                case 1:
                    user = _a.sent();
                    if (user == null)
                        return [2 /*return*/, false];
                    if (user.password == password)
                        return [2 /*return*/, true];
                    else
                        return [2 /*return*/, false];
                    return [3 /*break*/, 3];
                case 2:
                    E_4 = _a.sent();
                    console.log("Error While Validating User");
                    throw new Error("Error While validating user in UserDao");
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addSubscription(email, subLevel) {
    return __awaiter(this, void 0, void 0, function () {
        var resumesToBeAdded, moneyPaid, col, result, subCol, E_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, containsUser(email)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    resumesToBeAdded = 0;
                    moneyPaid = 0;
                    if (subLevel == 1) {
                        resumesToBeAdded = 2;
                        moneyPaid = 2;
                    }
                    if (subLevel == 2) {
                        resumesToBeAdded = 10;
                        moneyPaid = 5;
                    }
                    if (subLevel == 3) {
                        resumesToBeAdded = 100;
                        moneyPaid = 30;
                    }
                    if (subLevel < 0 || subLevel > 3)
                        throw new Error("Invalid Sub Level");
                    col = globalThis.mongoClient.db('resume_builder').collection('users');
                    return [4 /*yield*/, col.findOneAndUpdate({ email: email }, { $set: { 'isPremium': true }, $inc: { 'aiResumesLeft': resumesToBeAdded } })];
                case 2:
                    result = _a.sent();
                    subCol = globalThis.mongoClient.db('resume_builder').collection('subscriptions');
                    return [4 /*yield*/, subCol.insertOne({ email: email, subLevel: subLevel, moneyPaid: moneyPaid })];
                case 3:
                    _a.sent();
                    if (result == null)
                        throw new Error("Couldn't Update Record");
                    return [3 /*break*/, 5];
                case 4: throw new Error("Couldn't Find User");
                case 5: return [3 /*break*/, 7];
                case 6:
                    E_5 = _a.sent();
                    console.log(E_5);
                    throw new Error("Error While Add Sub to user in UserDao");
                case 7: return [2 /*return*/];
            }
        });
    });
}
function incrementResumes(email, count) {
    return __awaiter(this, void 0, void 0, function () {
        var col, result, E_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, containsUser(email)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    col = globalThis.mongoClient.db('resume_builder').collection('users');
                    return [4 /*yield*/, col.findOneAndUpdate({ email: email }, { $inc: { 'aiResumesLeft': count } })];
                case 2:
                    result = _a.sent();
                    if (result == null)
                        throw new Error("Couldn't Update Record");
                    return [3 /*break*/, 4];
                case 3: throw new Error("Couldn't Find User");
                case 4: return [3 /*break*/, 6];
                case 5:
                    E_6 = _a.sent();
                    console.log(E_6);
                    throw new Error("Couldn't Change Count");
                case 6: return [2 /*return*/];
            }
        });
    });
}
