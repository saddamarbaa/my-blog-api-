import express from 'express';

import {
  addCommentValidation,
  addPostValidation,
  commentIdValidation,
  deleteCommentValidation,
  isLogin,
  postIdValidation,
  postPaginationMiddleware,
  updateCommentValidation,
  updatePostValidation,
  uploadImage
} from '@src/middlewares';
import {
  addCommentInPostController,
  createPostController,
  deleteAllCommentInPostController,
  deleteCommentInPostController,
  deletePostController,
  deleteUserCommentInPostController,
  deleteUserPostsController,
  getAllCommentInPostController,
  getCommentInPostController,
  getPostController,
  getPostsController,
  getTimelinePostsController,
  getUserCommentInPostController,
  getUserPostsController,
  likePostController,
  updateCommentInPostController,
  updatePostController
} from '@src/controllers';

const router = express.Router();

router.get('/', postPaginationMiddleware(), getPostsController);
router.get('/user-posts', isLogin, getUserPostsController);
router.get('/timeline', isLogin, getTimelinePostsController);
router.delete('/user-posts', isLogin, deleteUserPostsController);
router.put('/comment', isLogin, addCommentValidation, addCommentInPostController);
router.patch('/comment', isLogin, updateCommentValidation, updateCommentInPostController);
router.delete('/comment', isLogin, deleteCommentValidation, deleteCommentInPostController);
router.delete('/comment/:postId', isLogin, updatePostValidation, deleteAllCommentInPostController);
router.delete('/user-comment/:postId', isLogin, postIdValidation, deleteUserCommentInPostController);
router.get('/comment/:postId/:commentId', isLogin, postIdValidation, commentIdValidation, getCommentInPostController);
router.get('/comment/:postId', isLogin, postIdValidation, getAllCommentInPostController);
router.get('/user-comment/:postId', isLogin, updatePostValidation, getUserCommentInPostController);
router.get('/:postId', postIdValidation, getPostController);
router.delete('/:postId', isLogin, postIdValidation, deletePostController);
router.patch('/:postId', uploadImage.single('postImage'), isLogin, updatePostValidation, updatePostController);
router.post('/', uploadImage.single('postImage'), isLogin, addPostValidation, createPostController);
router.put('/:postId/like', isLogin, postIdValidation, likePostController);

export = router;
