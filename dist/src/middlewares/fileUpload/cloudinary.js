"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const configs_1 = require("@src/configs");
exports.cloudinary = cloudinary_1.default.v2;
exports.cloudinary.config({
    cloud_name: configs_1.environmentConfig.CLOUDINARY_CLOUD_NAME,
    api_key: configs_1.environmentConfig.CLOUDINARY_API_KEY,
    api_secret: configs_1.environmentConfig.CLOUDINARY_API_SECRET
});
exports.default = exports.cloudinary;
//# sourceMappingURL=cloudinary.js.map