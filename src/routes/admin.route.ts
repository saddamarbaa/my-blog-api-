import express from 'express';
import {
  addPostValidation,
  customRoles,
  deleteCommentValidation,
  isAdmin,
  isLogin,
  postIdValidation,
  postPaginationMiddleware,
  signupUserValidation,
  updatePostValidation,
  updateUserValidation,
  uploadImage,
  userIdValidation,
  usersPaginationMiddleware
} from '@src/middlewares';
import {
  adminAddUserController,
  adminCreatePostController,
  adminDeleteAllCommentInPostController,
  adminDeleteAllPostForGivenUserController,
  adminDeleteCommentInPostController,
  adminDeletePostController,
  adminGetPostController,
  adminGetPostsController,
  adminGetUserController,
  adminGetUsersController,
  adminRemoveUserController,
  adminUpdateAuthController,
  adminUpdatePostController
} from '@src/controllers';
import { adminClearAllPostsService } from '@src/services';
import { environmentConfig } from '@src/configs';
import { AUTHORIZATION_ROLES } from '@src/constants';

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

router
  .route('/posts')
  .get(isLogin, isAdmin, postPaginationMiddleware(), adminGetPostsController)
  .post(uploadImage.single('postImage'), isLogin, isAdmin, addPostValidation, adminCreatePostController);

router.delete('/posts/clear-all-posts', isLogin, isAdmin, adminClearAllPostsService);

router.delete('/posts/user/:userId', isLogin, isAdmin, userIdValidation, adminDeleteAllPostForGivenUserController);

router.delete('/posts/comment', isLogin, isAdmin, deleteCommentValidation, adminDeleteCommentInPostController);

router
  .route('/posts/comment/:postId')
  .delete(isLogin, isAdmin, postIdValidation, adminDeleteAllCommentInPostController);

router
  .route('/posts/:postId')
  .get(isLogin, isAdmin, postIdValidation, adminGetPostController)
  .delete(isLogin, isAdmin, postIdValidation, adminDeletePostController)
  .patch(
    uploadImage.single('postImage'),
    isLogin,
    customRoles(environmentConfig.ADMIN_EMAILS, AUTHORIZATION_ROLES.ADMIN),
    updatePostValidation,
    adminUpdatePostController
  );

export = router;
