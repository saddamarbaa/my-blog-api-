import express from 'express';

import {
  blockUserController,
  followUserController,
  getUserController,
  getUsersController,
  unBlockUserController,
  unFollowUserController,
  whoViewedMyProfileController
} from '@src/controllers';
import { isLogin, updateUserValidation, userIdValidation } from '@src/middlewares';

const router = express.Router();

// Follow and Unfollow Routes
router.put('/:userId/follow', isLogin, updateUserValidation, followUserController);
router.put('/:userId/un-follow', isLogin, updateUserValidation, unFollowUserController);

// Block and Unblock Routes
router.put('/:userId/block', isLogin, updateUserValidation, blockUserController);
router.put('/:userId/unblock', isLogin, updateUserValidation, unBlockUserController);

// Get users and a specific user routes
router.get('/users', isLogin, getUsersController);
router.get('/:userId', isLogin, updateUserValidation, getUserController);

// View profile route (who viewed my profile)
router.get('/:userId/view-profile', isLogin, userIdValidation, whoViewedMyProfileController);

export = router;
