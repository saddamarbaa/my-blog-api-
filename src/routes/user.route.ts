import express from 'express';

import {
  blockUserController,
  followUserController,
  getUserController,
  getUsersController,
  unBlockUserController,
  unFollowUserController
} from '@src/controllers';
import { isLogin, updateUserValidation } from '@src/middlewares';

const router = express.Router();

router.put('/:userId/follow', isLogin, updateUserValidation, followUserController);
router.put('/:userId/un-follow', isLogin, updateUserValidation, unFollowUserController);

router.put('/:userId/block', isLogin, updateUserValidation, blockUserController);
router.put('/:userId/unblock', isLogin, updateUserValidation, unBlockUserController);
router.get('/users', isLogin, getUsersController);
router.get('/:userId', isLogin, updateUserValidation, getUserController);

export = router;
