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
exports.generateOpenAIJson = generateOpenAIJson;
var openai_1 = require("openai");
var dotenv = require("dotenv");
dotenv.config();
var json5_1 = require("json5");
var configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_KEY,
});
var openai = new openai_1.OpenAIApi(configuration);
function generateOpenAIJson(resumeDescription, retryLeft) {
    return __awaiter(this, void 0, void 0, function () {
        var completion, x, valu, parse, E_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, openai.createCompletion({
                            model: "text-davinci-003",
                            prompt: "\n    generate resume from given text\n\n\n    Instructions:\n    Extract the name of the person.\n\n    Extract the profession of the person\n\n    Extract the skills provided and something extra in description which tells how I used the skill, skill description must be long.\n\n    Extract the education details\n\n    Extract the work history\n\n    Generate an abstract about the person, Abstract must be long\n\n    Generate 3 random life skill values and description, skill description must be long \n\n    \n\n\n    \n\n\n    Text:\"\"\"\n   ".concat(resumeDescription, "\n    \"\"\"\n\n\n    \n    \n\n\n    Format it in  json, Json properties  must be enclosed in double quotes and must be lowercase and all values must be enclosed in double quotes if strings:\n\n\n    \"name\": string\n\n    \"profession\":string\n\n    \"abstract\" : string\n\n    \"values\": [\"name\":Name Of Value,\"description\":Something about the value]\n\n    \"skills\": [\"name\":Name Of Skill,\"description\":Something about the skill]\n\n    \"education\": array of {\"institution\":Name Of Institution,\"from\":Start Date,\"to\":Last Date,\"course\": Name of course studied}\n\n    \"work\":array of {\"company\":Name of company,\"designation\":The designation in the company,\"from\":Joining Date,\"to\":Last Date}\n\n        \n        \n  "), max_tokens: 2000
                        })];
                case 1:
                    completion = _b.sent();
                    x = completion.data.choices[0].text;
                    valu = (_a = completion.data.choices[0].text) === null || _a === void 0 ? void 0 : _a.substring(x.indexOf("{"), x.lastIndexOf("}") + 1);
                    parse = json5_1.default.parse(valu);
                    return [2 /*return*/, parse];
                case 2:
                    E_1 = _b.sent();
                    if (retryLeft == 0)
                        throw new Error("Retries Completed");
                    else
                        console.log("Attempt OPENAI FAILED");
                    return [2 /*return*/, generateOpenAIJson(resumeDescription, retryLeft - 1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
