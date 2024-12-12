"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminEmails = exports.userPayload = exports.validMongooseObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("@src/configs");
exports.validMongooseObjectId = new mongoose_1.default.Types.ObjectId().toString();
exports.userPayload = {
    firstName: 'john',
    lastName: 'doe',
    email: 'testverstmion@gmail.com',
    password: 'Password123',
    gender: 'female',
    confirmPassword: 'Password123'
};
exports.adminEmails = configs_1.environmentConfig?.ADMIN_EMAILS && JSON.parse(configs_1.environmentConfig.ADMIN_EMAILS);
//# sourceMappingURL=testData.js.map