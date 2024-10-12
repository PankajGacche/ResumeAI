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
exports.generateBasicResume = generateBasicResume;
function sectionHeader(header) {
    header = header.toUpperCase();
    return "<h3 style=\"text-align:center;\"   ><span style='text-align:center;text-decoration:underline;font-weight:bold'>".concat(header, "</span></h3>");
}
function generateBasicResume(data) {
    return __awaiter(this, void 0, void 0, function () {
        var modified, _i, _a, x, education, curString, _b, _c, y, skills, skillString, _d, _e, y, values, valuesString, _f, _g, y, work, workString, _h, _j, y;
        return __generator(this, function (_k) {
            modified = { headers: {}, sections: [] };
            for (_i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                x = _a[_i];
                switch (x) {
                    case 'name':
                        modified["headers"]["name"] = { name: "name", headerContent: "<h1 style=\"text-align:center\">".concat(data[x], "</h1>") };
                        break;
                    case 'profession':
                        modified["headers"]["profession"] = { name: "profession", headerContent: "<h3 style=\"text-align:center\">".concat(data[x], "</h3>") };
                        break;
                    case 'email':
                        modified["headers"]["email"] = { name: "email", headerContent: "<h4>".concat(data[x], "</h4>") };
                        break;
                    case 'phone':
                        modified["headers"]["phone"] = { name: "phone", headerContent: "<h4>".concat(data[x], "</h4>") };
                        break;
                    case 'abstract':
                        modified["sections"].push({ name: "abstract", headerContent: sectionHeader(x), sectionContent: "<h4>".concat(data[x], "</h4>") });
                        break;
                    case 'education':
                        education = { "name": x, headerContent: sectionHeader(x), sectionContent: "" };
                        curString = "<ul>";
                        for (_b = 0, _c = data[x]; _b < _c.length; _b++) {
                            y = _c[_b];
                            y = y;
                            curString += "<li><h4>".concat(y['course'], "</h4><ul>");
                            curString += "<li><h5>".concat(y['institution'], "</h5></li>");
                            curString += "<li><h5>".concat(y['from'], " - ").concat(y["to"], "</h5></li></ul></li>");
                        }
                        curString += '</ul>';
                        education["sectionContent"] = curString;
                        modified["sections"].push(education);
                        break;
                    case 'skills':
                        skills = { "name": x, headerContent: sectionHeader(x), sectionContent: "" };
                        skillString = "<ul>";
                        for (_d = 0, _e = data[x]; _d < _e.length; _d++) {
                            y = _e[_d];
                            y = y;
                            skillString += "<li><h4>".concat(y['name'], "</h4><ul>");
                            skillString += "<li><h5>".concat(y['description'], "</h5></li></ul></li>");
                        }
                        skillString += '</ul>';
                        skills["sectionContent"] = skillString;
                        modified["sections"].push(skills);
                        break;
                    case 'values':
                        values = { "name": x, headerContent: sectionHeader(x), sectionContent: "" };
                        valuesString = "<ul>";
                        for (_f = 0, _g = data[x]; _f < _g.length; _f++) {
                            y = _g[_f];
                            y = y;
                            valuesString += "<li><h4>".concat(y['name'], "</h4><ul>");
                            valuesString += "<li><h5>".concat(y['description'], "</h5></li></ul></li>");
                        }
                        valuesString += '</ul>';
                        values["sectionContent"] = valuesString;
                        modified["sections"].push(values);
                        break;
                    case 'work':
                        work = { "name": x, headerContent: sectionHeader(x), sectionContent: "" };
                        workString = "<ul>";
                        for (_h = 0, _j = data[x]; _h < _j.length; _h++) {
                            y = _j[_h];
                            y = y;
                            workString += "<li><h4>".concat(y['company'], "</h4><ul>");
                            workString += "<li><h5>".concat(y['designation'], "</h5></li>");
                            workString += "<li><h5>".concat(y['from'], " - ").concat(y["to"], "</h5></li></ul></li>");
                        }
                        workString += '</ul>';
                        work["sectionContent"] = workString;
                        modified["sections"].push(work);
                        break;
                }
            }
            return [2 /*return*/, modified];
        });
    });
}
/**
 * {header:{"name":{}},sections:[{sectionName:string,sectionHeader:html,sectionContent:html}]}
 */ 
