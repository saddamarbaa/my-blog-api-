"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("@src/middlewares");
const controllers_1 = require("@src/controllers");
const services_1 = require("@src/services");
const configs_1 = require("@src/configs");
const constants_1 = require("@src/constants");
const router = express_1.default.Router();
router.get('/users', middlewares_1.isLogin, middlewares_1.isAdmin, (0, middlewares_1.usersPaginationMiddleware)(), controllers_1.adminGetUsersController);
router.get('/users/:userId', middlewares_1.isLogin, middlewares_1.isAdmin, controllers_1.adminGetUserController);
router.post('/users/add', middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.uploadImage.single('profileImage'), middlewares_1.signupUserValidation, controllers_1.adminAddUserController);
router.put('/users/update/:userId', middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.uploadImage.single('profileImage'), middlewares_1.updateUserValidation, controllers_1.adminUpdateAuthController);
router.delete('/users/remove/:userId', middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.userIdValidation, controllers_1.adminRemoveUserController);
router
    .route('/posts')
    .get(middlewares_1.isLogin, middlewares_1.isAdmin, (0, middlewares_1.postPaginationMiddleware)(), controllers_1.adminGetPostsController)
    .post(middlewares_1.uploadImage.single('postImage'), middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.addPostValidation, controllers_1.adminCreatePostController);
router.delete('/posts/clear-all-posts', middlewares_1.isLogin, middlewares_1.isAdmin, services_1.adminClearAllPostsService);
router.delete('/posts/user/:userId', middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.userIdValidation, controllers_1.adminDeleteAllPostForGivenUserController);
router.delete('/posts/comment', middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.deleteCommentValidation, controllers_1.adminDeleteCommentInPostController);
router
    .route('/posts/comment/:postId')
    .delete(middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.postIdValidation, controllers_1.adminDeleteAllCommentInPostController);
router
    .route('/posts/:postId')
    .get(middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.postIdValidation, controllers_1.adminGetPostController)
    .delete(middlewares_1.isLogin, middlewares_1.isAdmin, middlewares_1.postIdValidation, controllers_1.adminDeletePostController)
    .patch(middlewares_1.uploadImage.single('postImage'), middlewares_1.isLogin, (0, middlewares_1.customRoles)(configs_1.environmentConfig.ADMIN_EMAILS, constants_1.AUTHORIZATION_ROLES.ADMIN), middlewares_1.updatePostValidation, controllers_1.adminUpdatePostController);
module.exports = router;
//# sourceMappingURL=admin.route.js.map