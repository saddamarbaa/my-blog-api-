"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = void 0;
const validator_1 = __importDefault(require("../validator"));
const subscriberSchema_1 = require("./subscriberSchema");
const emailValidation = (req, res, next) => (0, validator_1.default)(subscriberSchema_1.subscriberSchema.validatedEmail, { ...req.body, ...req.params }, next);
exports.emailValidation = emailValidation;
//# sourceMappingURL=subscriberValidation.js.map