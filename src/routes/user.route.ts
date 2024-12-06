import express from 'express';

import {
  blockUserController,
  followUserController,
  getUsersController,
  unBlockUserController,
  unFollowUserController
} from '@src/controllers';
import { isLogin, updateUserValidation } from '@src/middlewares';

const router = express.Router();

// Follow and unfollow routes
router.put('/:userId/follow', isLogin, updateUserValidation, followUserController);
router.put('/:userId/un-follow', isLogin, updateUserValidation, unFollowUserController);

// Block and unblock routes
router.put('/:userId/block', isLogin, updateUserValidation, blockUserController);
router.put('/:userId/unblock', isLogin, updateUserValidation, unBlockUserController);

router.get('/users', isLogin, getUsersController);

export = router;
