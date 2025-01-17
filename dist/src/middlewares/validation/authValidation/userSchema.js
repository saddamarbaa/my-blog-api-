"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_objectid_1 = __importDefault(require("joi-objectid"));
const constants_1 = require("@src/constants");
const vaildObjectId = (0, joi_objectid_1.default)(joi_1.default);
exports.userSchema = {
    signupUser: joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(15).required().messages({
            'string.base': 'First name must be a string',
            'string.empty': 'First name is required',
            'string.min': 'First name must be at least 3 characters long',
            'string.max': 'First name must not exceed 15 characters',
            'any.required': 'First name is required'
        }),
        lastName: joi_1.default.string().min(3).max(15).required().messages({
            'string.base': 'Last name must be a string',
            'string.empty': 'Last name is required',
            'string.min': 'Last name must be at least 3 characters long',
            'string.max': 'Last name must not exceed 15 characters',
            'any.required': 'Last name is required'
        }),
        email: joi_1.default.string().email().required().messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
        password: joi_1.default.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters long',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }),
        confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref('password')).messages({
            'any.only': 'Confirm password must match password',
            'any.required': 'Confirm password is required'
        }),
        bio: joi_1.default.string().max(500).optional().messages({
            'string.max': "Bio can't be longer than 500 characters"
        }),
        skills: joi_1.default.array().items(joi_1.default.string()).default([]).optional(),
        profileUrl: joi_1.default.string().uri().optional().messages({
            'string.uri': 'Please provide a valid URL for the profile image'
        }),
        acceptTerms: joi_1.default.boolean(),
        phoneNumber: joi_1.default.string()
            .pattern(/^\+?[1-9]\d{1,14}$/)
            .optional()
            .messages({
            'string.pattern.base': 'Please provide a valid phone number'
        }),
        gender: joi_1.default.string()
            .valid(...constants_1.GENDER_OPTIONS)
            .optional()
            .messages({
            'any.only': 'Gender must be one of: male, female, or other'
        }),
        userAward: joi_1.default.string()
            .valid(...constants_1.USER_AWARD_OPTIONS)
            .optional(),
        plan: joi_1.default.string()
            .valid(...constants_1.USER_PLAN_OPTIONS)
            .optional(),
        dateOfBirth: joi_1.default.date().optional()
    }),
    updateUser: joi_1.default.object({
        userId: vaildObjectId().required(),
        email: joi_1.default.string().email(),
        firstName: joi_1.default.string().min(3).max(15),
        lastName: joi_1.default.string().min(3).max(15),
        phoneNumber: joi_1.default.string()
            .pattern(/^\+?[1-9]\d{1,14}$/)
            .optional()
            .messages({
            'string.pattern.base': 'Please provide a valid phone number'
        }),
        profileUrl: joi_1.default.string().uri().allow('').optional(),
        status: joi_1.default.string(),
        bio: joi_1.default.string().min(10).max(500),
        acceptTerms: joi_1.default.boolean(),
        gender: joi_1.default.string()
            .valid(...constants_1.GENDER_OPTIONS)
            .optional()
            .messages({
            'any.only': 'Gender must be one of: male, female, or other'
        }),
        userAward: joi_1.default.string()
            .valid(...constants_1.USER_AWARD_OPTIONS)
            .optional(),
        plan: joi_1.default.string()
            .valid(...constants_1.USER_PLAN_OPTIONS)
            .optional(),
        dateOfBirth: joi_1.default.date().optional()
    }),
    loginUser: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required()
    }),
    refreshToken: joi_1.default.object({
        refreshToken: joi_1.default.string().min(3).max(300).required()
    }),
    validatedUserId: joi_1.default.object({
        userId: vaildObjectId().required()
    }),
    verifyUserMail: joi_1.default.object({
        token: joi_1.default.string().min(3).max(300).required(),
        userId: vaildObjectId().required()
    }),
    sendVerificationMail: joi_1.default.object({
        email: joi_1.default.string().email().required()
    }),
    resetPassword: joi_1.default.object({
        token: joi_1.default.string().min(3).max(300).required(),
        userId: vaildObjectId().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref('password'))
    }),
    verifyToken: joi_1.default.object({
        token: joi_1.default.string().min(3).max(300).required()
    })
};
exports.default = exports.userSchema;
//# sourceMappingURL=userSchema.js.map