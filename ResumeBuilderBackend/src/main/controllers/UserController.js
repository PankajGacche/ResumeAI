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
exports.addUserEndpoint = addUserEndpoint;
exports.loginUserEndpoint = loginUserEndpoint;
exports.addSubscriptionEndpoint = addSubscriptionEndpoint;
exports.getLoggedInUser = getLoggedInUser;
var jsonwebtoken_1 = require("jsonwebtoken");
var UserDAO_js_1 = require("../DAO/UserDAO.js");
var maxSeconds = 30 * 24 * 60 * 60 * 1000;
function addUserEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, verdict, E_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { 'success': false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!(req.body.email == null || req.body.password == null || req.body.name == null)) return [3 /*break*/, 2];
                    result.message = "Some Missing Fields!";
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, (0, UserDAO_js_1.containsUser)(req.body.email)];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    result.message = "User Already Present";
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, (0, UserDAO_js_1.addUser)(req.body.email, req.body.name, req.body.password)];
                case 5:
                    verdict = _a.sent();
                    if (verdict == false) {
                        result.message = "Couldn't Add User";
                    }
                    else {
                        result.success = true;
                        result.message = "Succesfully Added User";
                        result.data = { email: req.body.email, name: req.body.name };
                        res.cookie('user', jsonwebtoken_1.default.sign(result.data, process.env.JWT_SECRET_KEY), { maxAge: maxSeconds });
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    E_1 = _a.sent();
                    result.success = false;
                    result.message = "A Fatal Error Occured";
                    console.log("An Error Occured While Adding User", E_1);
                    return [3 /*break*/, 8];
                case 8:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function loginUserEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, user, verdict, E_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { 'success': false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    if (!(req.body.email == null || req.body.password == null)) return [3 /*break*/, 2];
                    result.message = "Some Missing Fields!";
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, (0, UserDAO_js_1.getUser)(req.body.email)];
                case 3:
                    user = _a.sent();
                    if (!(user == null)) return [3 /*break*/, 4];
                    result.message = "User Is Not Registered!";
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, (0, UserDAO_js_1.validateUser)(req.body.email, req.body.password)];
                case 5:
                    verdict = _a.sent();
                    if (verdict == false) {
                        result.message = "Invalid Password";
                    }
                    else {
                        result.success = true;
                        result.message = "Succesfully Logged In User";
                        user.password = "";
                        result.data = user;
                        res.cookie('user', jsonwebtoken_1.default.sign(result.data, process.env.JWT_SECRET_KEY), { maxAge: maxSeconds });
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    E_2 = _a.sent();
                    result.success = false;
                    result.message = "A Fatal Error Occured";
                    console.log("An Error Occured While Logging In User", E_2);
                    return [3 /*break*/, 8];
                case 8:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function addSubscriptionEndpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, user, updatedUser, E_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false, message: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    user = res.locals.user;
                    if (user == null)
                        throw new Error("Couldn't Find user");
                    return [4 /*yield*/, (0, UserDAO_js_1.getUser)(user.email)];
                case 2:
                    updatedUser = _a.sent();
                    if (updatedUser == null)
                        throw new Error("Couldn't Find User");
                    return [4 /*yield*/, (0, UserDAO_js_1.addSubscription)(updatedUser.email, req.body.subLevel)];
                case 3:
                    _a.sent();
                    result.success = true;
                    result.message = "Added Subscription";
                    return [3 /*break*/, 5];
                case 4:
                    E_3 = _a.sent();
                    console.log(E_3);
                    result.success = false;
                    result.message = "Couldn't Subscribe";
                    return [3 /*break*/, 5];
                case 5:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
function getLoggedInUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, user, E_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = { success: false };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (res.locals.user == null)
                        throw new Error("Couldn't Find User");
                    return [4 /*yield*/, (0, UserDAO_js_1.getUser)(res.locals.user.email)];
                case 2:
                    user = _a.sent();
                    if (user != null) {
                        user.password = "";
                        result.success = true;
                        result.data = user;
                        result.loggedIn = true;
                    }
                    else {
                        result.loggedIn = false;
                        result.success = true;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    E_4 = _a.sent();
                    console.log("Couldn't Find User");
                    result.success = false;
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
