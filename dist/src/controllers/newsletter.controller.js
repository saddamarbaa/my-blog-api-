"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailSubscriptionController = exports.unsubscribeFromNewsController = exports.subscriberToNewsletterController = void 0;
const services_1 = require("@src/services");
const subscriberToNewsletterController = async (req, res, next) => (0, services_1.subscriberToNewsletterService)(req, res, next);
exports.subscriberToNewsletterController = subscriberToNewsletterController;
const unsubscribeFromNewsController = async (req, res, next) => (0, services_1.unsubscribeFromNewsletterService)(req, res, next);
exports.unsubscribeFromNewsController = unsubscribeFromNewsController;
const verifyEmailSubscriptionController = (req, res, next) => (0, services_1.verifyEmailSubscriptionService)(req, res, next);
exports.verifyEmailSubscriptionController = verifyEmailSubscriptionController;
//# sourceMappingURL=newsletter.controller.js.map