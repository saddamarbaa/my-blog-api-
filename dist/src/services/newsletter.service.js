"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeFromNewsletterService = exports.verifyEmailSubscriptionService = exports.subscriberToNewsletterService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Newsletter_model_1 = __importDefault(require("@src/models/Newsletter.model"));
const utils_1 = require("@src/utils");
const configs_1 = require("@src/configs");
const subscriberToNewsletterService = async (req, res, next) => {
    try {
        const { email, subscriptionType } = req.body;
        const isEmailExist = await Newsletter_model_1.default.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (isEmailExist) {
            return next((0, http_errors_1.default)(409, `Email address ${email} is already subscribed to the newsletter.`));
        }
        const newSubscriber = new Newsletter_model_1.default({
            email,
            subscriptionType: subscriptionType || 'daily'
        });
        newSubscriber.generateVerificationToken();
        const subscriber = await newSubscriber.save();
        const verifyEmailLink = `${configs_1.environmentConfig.WEBSITE_URL}/newsletters/verify?token=${subscriber.verificationToken}`;
        const { data: emailData, error } = await (0, utils_1.sendMail)({
            to: subscriber.email,
            ...(0, utils_1.sendNewsletterConfirmationTemplate)(verifyEmailLink)
        });
        if (error) {
            if (process?.env?.NODE_ENV === 'development') {
                console.log('Sending Email error:', error);
            }
        }
        else if (process?.env?.NODE_ENV === 'development') {
            console.log(`Successfully sent confirmation email to ${email}...`);
            console.log(emailData);
        }
        const data = {
            verifyEmailLink,
            request: {
                type: 'Get',
                description: 'Verify your email address to complete the subscription process.',
                url: `${process.env.API_URL}/api/${process.env.API_VERSION}/newsletters/verify?token=${subscriber.verificationToken}`
            }
        };
        return res.status(200).json((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'Thank you for subscribing! Please check your email to confirm your subscription.',
            status: 200,
            data
        }));
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, 'An error occurred while subscribing to the newsletter.'));
    }
};
exports.subscriberToNewsletterService = subscriberToNewsletterService;
const verifyEmailSubscriptionService = async (req, res, next) => {
    try {
        const { token } = req.query;
        const subscriber = await Newsletter_model_1.default.findOne({ verificationToken: token });
        if (!subscriber) {
            return next((0, http_errors_1.default)(404, 'Invalid or expired verification token.'));
        }
        subscriber.isVerified = true;
        subscriber.verificationToken = '';
        await subscriber.save();
        const data = {
            message: 'Your email has been successfully verified! You are now subscribed to the newsletter.',
            request: {
                type: 'Get',
                description: 'Get the latest newsletter posts',
                url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
            }
        };
        return res.status(200).json((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'Email verified successfully.',
            status: 200,
            data
        }));
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, 'An error occurred while verifying your email.'));
    }
};
exports.verifyEmailSubscriptionService = verifyEmailSubscriptionService;
const unsubscribeFromNewsletterService = async (req, res, next) => {
    try {
        const { email } = req.body;
        const subscriber = await Newsletter_model_1.default.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (!subscriber) {
            return next((0, http_errors_1.default)(404, 'Email address not found in the newsletter please subscribe.'));
        }
        await Newsletter_model_1.default.deleteOne({ email: new RegExp(`^${email}$`, 'i') });
        const data = {
            message: 'You have successfully unsubscribed from the newsletter.',
            request: {
                type: 'Get',
                description: 'Get all posts',
                url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
            }
        };
        return res.status(200).json((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'Unsubscribed successfully.',
            status: 200,
            data
        }));
    }
    catch (err) {
        return next((0, http_errors_1.default)(500, 'An error occurred while unsubscribing from the newsletter.'));
    }
};
exports.unsubscribeFromNewsletterService = unsubscribeFromNewsletterService;
//# sourceMappingURL=newsletter.service.js.map