"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
const http_errors_1 = __importDefault(require("http-errors"));
function notFound(req, res, next) {
    next((0, http_errors_1.default)(404, `Route - ${req.originalUrl}  Not Found`));
}
exports.default = notFound;
//# sourceMappingURL=notFound.middleware.js.map