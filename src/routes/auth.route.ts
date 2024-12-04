import express from 'express';
import {
  forgotPasswordController,
  getProfileController,
  loginController,
  logoutController,
  refreshTokenController,
  removeAccountController,
  resetPasswordController,
  signupController,
  updateAccountController,
  verifyEmailController
} from '@src/controllers';
import {
  isLogin,
  loginUserValidation,
  refreshTokenValidation,
  resetPasswordValidation,
  sendVerificationMailValidation,
  signupUserValidation,
  updateUserValidation,
  uploadImage,
  userIdValidation,
  verifyUserMailValidation
} from '@src/middlewares';

const router = express.Router();

router.post('/signup', signupUserValidation, signupController);
router.post('/login', loginUserValidation, loginController);
router.post('/logout', refreshTokenValidation, logoutController);
router.post('/refresh-token', refreshTokenValidation, refreshTokenController);
router.delete('/remove/:userId', isLogin, userIdValidation, removeAccountController);
router.get('/profile', isLogin, getProfileController);
router.get('/verify-email/:userId/:token', verifyUserMailValidation, verifyEmailController);
router.patch(
  '/update/:userId',
  isLogin,
  uploadImage.single('profileImage'),
  updateUserValidation,
  updateAccountController
);
router.post('/forget-password', sendVerificationMailValidation, forgotPasswordController);
router.post('/reset-password/:userId/:token', resetPasswordValidation, resetPasswordController);

export = router;
