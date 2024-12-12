"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controllers_1 = require("@src/controllers");
const middlewares_1 = require("@src/middlewares");
const router = express_1.default.Router();
router.put('/:userId/follow', middlewares_1.isLogin, middlewares_1.updateUserValidation, controllers_1.followUserController);
router.put('/:userId/un-follow', middlewares_1.isLogin, middlewares_1.updateUserValidation, controllers_1.unFollowUserController);
router.put('/:userId/block', middlewares_1.isLogin, middlewares_1.updateUserValidation, controllers_1.blockUserController);
router.put('/:userId/unblock', middlewares_1.isLogin, middlewares_1.updateUserValidation, controllers_1.unBlockUserController);
router.get('/users', middlewares_1.isLogin, controllers_1.getUsersController);
router.get('/:userId', middlewares_1.isLogin, middlewares_1.updateUserValidation, controllers_1.getUserController);
module.exports = router;
//# sourceMappingURL=user.route.js.map