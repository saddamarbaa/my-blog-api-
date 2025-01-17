"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentConfig = void 0;
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
exports.environmentConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 8000,
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    TEST_ENV_MONGODB_CONNECTION_STRING: process.env.TEST_ENV_MONGODB_CONNECTION_STRING,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
    WEBSITE_URL: process.env.WEBSITE_URL,
    API_URL: process.env.API_URL,
    API_VERSION: process.env.API_VERSION,
    JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
    JWT_ISSUER: process.env.JWT_ISSUER,
    RESEND_EMAIL_API_KEY: process.env.RESEND_EMAIL_API_KEY,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_KEY_EXPIRE_TIME: process.env.ACCESS_TOKEN_KEY_EXPIRE_TIME,
    REFRESH_TOKEN_KEY_EXPIRE_TIME: process.env.REFRESH_TOKEN_KEY_EXPIRE_TIME,
    REST_PASSWORD_LINK_EXPIRE_TIME: process.env.REST_PASSWORD_LINK_EXPIRE_TIME,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS,
    MANGER_EMAILS: process.env.MANGER_EMAILS,
    MODERATOR_EMAILS: process.env.MODERATOR_EMAILS,
    SUPERVISOR_EMAILS: process.env.SUPERVISOR_EMAILS,
    GUIDE_EMAILS: process.env.GUIDE_EMAILS,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};
exports.default = exports.environmentConfig;
//# sourceMappingURL=custom-environment-variables.config.js.map