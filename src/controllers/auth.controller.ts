import { Request, Response, NextFunction, RequestHandler } from 'express';

import {
  deleteAccountService,
  forgotPasswordService,
  getProfileService,
  loginService,
  logoutService,
  refreshTokenService,
  resetPasswordService,
  signupService,
  updateAccountService,
  verifyEmailService
} from '@src/services';
import { AuthenticatedRequestBody, IUser } from '@src/interfaces';

export const signupController = (req: Request, res: Response, next: NextFunction) => signupService(req, res, next);

export const loginController = (req: Request, res: Response, next: NextFunction) => loginService(req, res, next);

export const verifyEmailController = (req: Request, res: Response, next: NextFunction) =>
  verifyEmailService(req, res, next);

export const logoutController = (req: Request, res: Response, next: NextFunction) => logoutService(req, res, next);

export const refreshTokenController: RequestHandler = async (req, res, next) => refreshTokenService(req, res, next);

export const removeAccountController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  deleteAccountService(req, res, next);

export const updateAccountController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  updateAccountService(req, res, next);

export const getProfileController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getProfileService(req, res, next);

export const forgotPasswordController: RequestHandler = async (req, res, next) => forgotPasswordService(req, res, next);

export const resetPasswordController: RequestHandler = async (req, res, next) => resetPasswordService(req, res, next);
