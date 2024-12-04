import Joi from 'joi';
// @ts-ignore
import JoiObjectId from 'joi-objectid';

import { GENDER_OPTIONS, USER_AWARD_OPTIONS, USER_PLAN_OPTIONS } from '@src/constants';

const vaildObjectId = JoiObjectId(Joi);

export const userSchema = {
  signupUser: Joi.object({
    firstName: Joi.string().min(3).max(15).required().messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.min': 'First name must be at least 3 characters long',
      'string.max': 'First name must not exceed 15 characters',
      'any.required': 'First name is required'
    }),
    lastName: Joi.string().min(3).max(15).required().messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.min': 'Last name must be at least 3 characters long',
      'string.max': 'Last name must not exceed 15 characters',
      'any.required': 'Last name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
      'any.only': 'Confirm password must match password',
      'any.required': 'Confirm password is required'
    }),
    bio: Joi.string().max(500).optional().messages({
      'string.max': "Bio can't be longer than 500 characters"
    }),
    skills: Joi.array().items(Joi.string()).default([]).optional(),
    profileUrl: Joi.string().uri().optional().messages({
      'string.uri': 'Please provide a valid URL for the profile image'
    }),
    acceptTerms: Joi.boolean(),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      }),
    gender: Joi.string()
      .valid(...GENDER_OPTIONS)
      .optional()
      .messages({
        'any.only': 'Gender must be one of: male, female, or other'
      }),
    userAward: Joi.string()
      .valid(...USER_AWARD_OPTIONS)
      .optional(),
    plan: Joi.string()
      .valid(...USER_PLAN_OPTIONS)
      .optional(),
    dateOfBirth: Joi.date().optional()
  }),
  updateUser: Joi.object({
    userId: vaildObjectId().required(),
    email: Joi.string().email(),
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      }),
    profileUrl: Joi.string().uri().allow('').optional(),
    status: Joi.string(),
    bio: Joi.string().min(10).max(500),
    acceptTerms: Joi.boolean(),
    gender: Joi.string()
      .valid(...GENDER_OPTIONS)
      .optional()
      .messages({
        'any.only': 'Gender must be one of: male, female, or other'
      }),
    userAward: Joi.string()
      .valid(...USER_AWARD_OPTIONS)
      .optional(),
    plan: Joi.string()
      .valid(...USER_PLAN_OPTIONS)
      .optional(),
    dateOfBirth: Joi.date().optional()
  }),

  loginUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  refreshToken: Joi.object({
    refreshToken: Joi.string().min(3).max(300).required()
  }),
  validatedUserId: Joi.object({
    userId: vaildObjectId().required()
  }),
  verifyUserMail: Joi.object({
    token: Joi.string().min(3).max(300).required(),
    userId: vaildObjectId().required()
  }),
  sendVerificationMail: Joi.object({
    email: Joi.string().email().required()
  }),
  resetPassword: Joi.object({
    token: Joi.string().min(3).max(300).required(),
    userId: vaildObjectId().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
  })
};

export default userSchema;
