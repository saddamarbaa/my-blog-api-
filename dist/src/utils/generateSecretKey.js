"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecretKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateSecretKey = (num = 32) => {
    return crypto_1.default.randomBytes(num).toString('hex');
};
exports.generateSecretKey = generateSecretKey;
//# sourceMappingURL=generateSecretKey.js.map