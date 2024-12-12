"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.resetPasswordValidation = exports.sendVerificationMailValidation = exports.verifyUserMailValidation = exports.userIdValidation = exports.refreshTokenValidation = exports.loginUserValidation = exports.signupUserValidation = void 0;
const validator_1 = __importDefault(require("../validator"));
const userSchema_1 = require("./userSchema");
const signupUserValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.signupUser, { ...req.body }, next);
exports.signupUserValidation = signupUserValidation;
const loginUserValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.loginUser, req.body, next);
exports.loginUserValidation = loginUserValidation;
const refreshTokenValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.refreshToken, req.body, next);
exports.refreshTokenValidation = refreshTokenValidation;
const userIdValidation = (req, res, next) => {
    return (0, validator_1.default)(userSchema_1.userSchema.validatedUserId, req.params, next);
};
exports.userIdValidation = userIdValidation;
const verifyUserMailValidation = (req, res, next) => {
    return (0, validator_1.default)(userSchema_1.userSchema.verifyUserMail, req.params, next);
};
exports.verifyUserMailValidation = verifyUserMailValidation;
const sendVerificationMailValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.sendVerificationMail, req.body, next);
exports.sendVerificationMailValidation = sendVerificationMailValidation;
const resetPasswordValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.resetPassword, { ...req.body, ...req.params }, next);
exports.resetPasswordValidation = resetPasswordValidation;
const updateUserValidation = (req, res, next) => (0, validator_1.default)(userSchema_1.userSchema.updateUser, { ...req.body, ...req.params }, next);
exports.updateUserValidation = updateUserValidation;
//# sourceMappingURL=userValidation.js.map