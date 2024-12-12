"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("@src/middlewares");
const controllers_1 = require("@src/controllers");
const router = express_1.default.Router();
router.get('/', (0, middlewares_1.postPaginationMiddleware)(), controllers_1.getPostsController);
router.get('/user-posts', middlewares_1.isLogin, controllers_1.getUserPostsController);
router.get('/timeline', middlewares_1.isLogin, controllers_1.getTimelinePostsController);
router.delete('/user-posts', middlewares_1.isLogin, controllers_1.deleteUserPostsController);
router.put('/comment', middlewares_1.isLogin, middlewares_1.addCommentValidation, controllers_1.addCommentInPostController);
router.patch('/comment', middlewares_1.isLogin, middlewares_1.updateCommentValidation, controllers_1.updateCommentInPostController);
router.delete('/comment', middlewares_1.isLogin, middlewares_1.deleteCommentValidation, controllers_1.deleteCommentInPostController);
router.delete('/comment/:postId', middlewares_1.isLogin, middlewares_1.updatePostValidation, controllers_1.deleteAllCommentInPostController);
router.delete('/user-comment/:postId', middlewares_1.isLogin, middlewares_1.postIdValidation, controllers_1.deleteUserCommentInPostController);
router.get('/comment/:postId/:commentId', middlewares_1.isLogin, middlewares_1.postIdValidation, middlewares_1.commentIdValidation, controllers_1.getCommentInPostController);
router.get('/comment/:postId', middlewares_1.isLogin, middlewares_1.postIdValidation, controllers_1.getAllCommentInPostController);
router.get('/user-comment/:postId', middlewares_1.isLogin, middlewares_1.updatePostValidation, controllers_1.getUserCommentInPostController);
router.get('/:postId', middlewares_1.postIdValidation, controllers_1.getPostController);
router.delete('/:postId', middlewares_1.isLogin, middlewares_1.postIdValidation, controllers_1.deletePostController);
router.patch('/:postId', middlewares_1.uploadImage.single('postImage'), middlewares_1.isLogin, middlewares_1.updatePostValidation, controllers_1.updatePostController);
router.post('/', middlewares_1.uploadImage.single('postImage'), middlewares_1.isLogin, middlewares_1.addPostValidation, controllers_1.createPostController);
router.put('/:postId/like', middlewares_1.isLogin, middlewares_1.postIdValidation, controllers_1.likePostController);
module.exports = router;
//# sourceMappingURL=post.route.js.map