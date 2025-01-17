"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controllers_1 = require("@src/controllers");
const middlewares_1 = require("@src/middlewares");
const router = express_1.default.Router();
router.post('/subscribe', middlewares_1.emailValidation, controllers_1.subscriberToNewsletterController);
router.post('/unsubscribe', middlewares_1.emailValidation, controllers_1.unsubscribeFromNewsController);
router.get('/verify-email/:token', middlewares_1.verifyToken, controllers_1.verifyEmailSubscriptionController);
module.exports = router;
//# sourceMappingURL=newsletter.route.js.map