"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.subscriberSchema = {
    validatedEmail: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        })
    })
};
//# sourceMappingURL=subscriberSchema.js.map