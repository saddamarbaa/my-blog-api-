"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controllers_1 = require("@src/controllers");
const middlewares_1 = require("@src/middlewares");
const router = express_1.default.Router();
router.post('/signup', middlewares_1.signupUserValidation, controllers_1.signupController);
router.post('/login', middlewares_1.loginUserValidation, controllers_1.loginController);
router.post('/logout', middlewares_1.refreshTokenValidation, controllers_1.logoutController);
router.post('/refresh-token', middlewares_1.refreshTokenValidation, controllers_1.refreshTokenController);
router.delete('/remove/:userId', middlewares_1.isLogin, middlewares_1.userIdValidation, controllers_1.removeAccountController);
router.get('/profile', middlewares_1.isLogin, controllers_1.getProfileController);
router.get('/verify-email/:userId/:token', middlewares_1.verifyUserMailValidation, controllers_1.verifyEmailController);
router.patch('/update/:userId', middlewares_1.isLogin, middlewares_1.uploadImage.single('profileImage'), middlewares_1.updateUserValidation, controllers_1.updateAccountController);
router.post('/forget-password', middlewares_1.sendVerificationMailValidation, controllers_1.forgotPasswordController);
router.post('/reset-password/:userId/:token', middlewares_1.resetPasswordValidation, controllers_1.resetPasswordController);
module.exports = router;
//# sourceMappingURL=auth.route.js.map