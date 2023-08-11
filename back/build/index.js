"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var multer_1 = __importDefault(require("multer"));
var database_1 = require("./api/database");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
app.post("/api/files", upload.single("file"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, csvData, lines, headers, _loop_1, _i, _a, line, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).json({ error: "No file uploaded" })];
                }
                csvData = file.buffer.toString("utf-8");
                lines = csvData.split("\n");
                headers = lines[0].split(",");
                _loop_1 = function (line) {
                    var values, csvObject, error_2;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                values = line.split(",");
                                csvObject = {};
                                headers.forEach(function (header, index) {
                                    csvObject[header] = values[index];
                                });
                                _c.label = 1;
                            case 1:
                                _c.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, database_1.prisma.user.create({
                                        data: {
                                            name: csvObject.name,
                                            city: csvObject.city,
                                            country: csvObject.country,
                                            favorite_sport: csvObject.favorite_sport,
                                        },
                                    })];
                            case 2:
                                _c.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                error_2 = _c.sent();
                                // Ignoring duplicate key errors
                                if (!error_2.message.includes("Duplicate entry")) {
                                    throw error_2;
                                }
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, _a = lines.slice(1);
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                line = _a[_i];
                return [5 /*yield**/, _loop_1(line)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                res
                    .status(200)
                    .json({ message: "File uploaded and data stored successfully" });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error(error_1);
                res
                    .status(500)
                    .json({ error: "An error occurred while uploading the file" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get("/api/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var q, searchResults, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                q = req.query.q;
                if (!q || typeof q !== "string") {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid search query" })];
                }
                return [4 /*yield*/, database_1.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      SELECT *\n      FROM User\n      WHERE name ILIKE ", "\n         OR city ILIKE ", "\n         OR country ILIKE ", "\n         OR favorite_sport ILIKE ", "\n    "], ["\n      SELECT *\n      FROM User\n      WHERE name ILIKE ", "\n         OR city ILIKE ", "\n         OR country ILIKE ", "\n         OR favorite_sport ILIKE ", "\n    "])), "%".concat(q, "%"), "%".concat(q, "%"), "%".concat(q, "%"), "%".concat(q, "%"))];
            case 1:
                searchResults = _a.sent();
                res.status(200).json(searchResults);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ error: "An error occurred while fetching data" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var PORT = 8290;
app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});
var templateObject_1;
