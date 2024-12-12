"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("@src/configs");
const verifyRefreshToken = async function (refreshToken) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(refreshToken, configs_1.environmentConfig.REFRESH_TOKEN_SECRET_KEY, (err, payload) => {
            if (err) {
                return reject(err);
            }
            if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
                console.log(payload.aud);
            }
            const userId = payload.aud;
            resolve(userId);
        });
    });
};
exports.verifyRefreshToken = verifyRefreshToken;
exports.default = exports.verifyRefreshToken;
//# sourceMappingURL=verifyRefreshToken.js.map