import express from 'express';
import {
  isAdmin,
  isLogin,
  signupUserValidation,
  updateUserValidation,
  uploadImage,
  userIdValidation,
  usersPaginationMiddleware
} from '@src/middlewares';
import {
  adminAddUserController,
  adminGetUserController,
  adminGetUsersController,
  adminRemoveUserController,
  adminUpdateAuthController
} from '@src/controllers';

const router = express.Router();

router.get('/users', isLogin, isAdmin, usersPaginationMiddleware(), adminGetUsersController);
router.get('/users/:userId', isLogin, isAdmin, adminGetUserController);

router.post(
  '/users/add',
  isLogin,
  isAdmin,
  uploadImage.single('profileImage'),
  signupUserValidation,
  adminAddUserController
);

router.put(
  '/users/update/:userId',
  isLogin,
  isAdmin,
  uploadImage.single('profileImage'),
  updateUserValidation,
  adminUpdateAuthController
);
router.delete('/users/remove/:userId', isLogin, isAdmin, userIdValidation, adminRemoveUserController);

export = router;
