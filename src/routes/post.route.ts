import express from 'express';

import { addPostValidation, isLogin, postIdValidation, postPaginationMiddleware, uploadImage } from '@src/middlewares';
import {
  createPostController,
  deletePostController,
  getPostController,
  getPostsController,
  getTimelinePostsController
} from '@src/controllers';

const router = express.Router();

router.get('/timeline', isLogin, getTimelinePostsController);
router.get('/', postPaginationMiddleware(), getPostsController);
router.post('/', uploadImage.single('postImage'), isLogin, addPostValidation, createPostController);
router.get('/:postId', postIdValidation, getPostController);
router.delete('/:postId', isLogin, postIdValidation, deletePostController);
export = router;
