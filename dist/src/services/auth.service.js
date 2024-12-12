"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordService = exports.forgotPasswordService = exports.verifyEmailService = exports.getProfileService = exports.deleteAccountService = exports.updateAccountService = exports.refreshTokenService = exports.logoutService = exports.loginService = exports.signupService = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const configs_1 = require("@src/configs");
const utils_1 = require("@src/utils");
const Token_model_1 = __importDefault(require("@src/models/Token.model"));
const User_model_1 = __importDefault(require("@src/models/User.model"));
const middlewares_1 = require("@src/middlewares");
const constants_1 = require("@src/constants");
const signupService = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, bio, skills, profileUrl, acceptTerms, confirmationCode, gender } = req.body;
        const isEmailExit = await User_model_1.default.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (isEmailExit) {
            return next((0, http_errors_1.default)(409, `E-Mail address ${email} is already exists, please pick a different one.`));
        }
        const finalUserProfilePic = (0, utils_1.getProfilePicture)(firstName, lastName, gender, profileUrl);
        const role = (0, utils_1.getRoleFromEmail)(email);
        const finalAcceptTerms = acceptTerms ||
            !!(configs_1.environmentConfig?.ADMIN_EMAILS &&
                JSON.parse(configs_1.environmentConfig.ADMIN_EMAILS)?.includes(`${email}`));
        const newUser = new User_model_1.default({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            bio,
            role,
            profileUrl: finalUserProfilePic,
            skills: skills || [],
            confirmationCode,
            acceptTerms: finalAcceptTerms
        });
        const user = await newUser.save();
        let token = new Token_model_1.default({ userId: user._id });
        const payload = { userId: user._id };
        const accessTokenSecretKey = configs_1.environmentConfig.ACCESS_TOKEN_SECRET_KEY;
        const refreshTokenSecretKey = configs_1.environmentConfig.REFRESH_TOKEN_SECRET_KEY;
        const accessTokenOptions = {
            expiresIn: configs_1.environmentConfig.ACCESS_TOKEN_KEY_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(user._id)
        };
        const refreshTokenOptions = {
            expiresIn: configs_1.environmentConfig.REFRESH_TOKEN_KEY_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(user._id)
        };
        const generatedAccessToken = await token.generateToken(payload, accessTokenSecretKey, accessTokenOptions);
        const generatedRefreshToken = await token.generateToken(payload, refreshTokenSecretKey, refreshTokenOptions);
        token.refreshToken = generatedRefreshToken;
        token.accessToken = generatedAccessToken;
        token = await token.save();
        const verifyEmailLink = `${configs_1.environmentConfig.WEBSITE_URL}/verify-email?id=${user._id}&token=${token.refreshToken}`;
        const { data: resendEmailData, error } = await (0, utils_1.sendMail)({
            to: user.email,
            ...(0, utils_1.sendEmailVerificationTemplate)(verifyEmailLink, firstName)
        });
        if (error) {
            if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
                console.log('Sending Email error:', error);
                console.log('Sending Email error:');
            }
        }
        else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log(`Successfully  send email to ${email}...`);
            console.log(resendEmailData);
        }
        const data = {
            user: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                verifyEmailLink
            }
        };
        return res.status(201).json((0, utils_1.customResponse)({
            data,
            success: true,
            error: false,
            message: `Auth Signup is success. An Email with Verification link has been sent to your account ${user.email} Please Verify Your Email first or use the email verification lik which is been send with the response body to verfiy your email`,
            status: 201
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.signupService = signupService;
const loginService = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User_model_1.default.findOne({ email: new RegExp(`^${email}$`, 'i') })
            .select('+password')
            .exec();
        if (!user) {
            return next((0, http_errors_1.default)(401, 'Auth Failed (Invalid Credentials)'));
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return next((0, http_errors_1.default)(401, 'Auth Failed (Invalid Credentials)'));
        }
        let token = await Token_model_1.default.findOne({ userId: user._id });
        if (!token) {
            token = await new Token_model_1.default({ userId: user._id });
            token = await token.save();
        }
        const generatedAccessToken = await token.generateToken({
            userId: user._id
        }, configs_1.environmentConfig.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: configs_1.environmentConfig.ACCESS_TOKEN_KEY_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(user._id)
        });
        const generatedRefreshToken = await token.generateToken({
            userId: user._id
        }, configs_1.environmentConfig.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: configs_1.environmentConfig.REFRESH_TOKEN_KEY_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(user._id)
        });
        token.refreshToken = generatedRefreshToken;
        token.accessToken = generatedAccessToken;
        token = await token.save();
        if (!user.isVerified || user.status !== 'active') {
            const verifyEmailLink = `${configs_1.environmentConfig.WEBSITE_URL}/verify-email?id=${user._id}&token=${token.refreshToken}`;
            const { data: resendEmailData, error } = await (0, utils_1.sendMail)({
                to: user.email,
                ...(0, utils_1.sendEmailVerificationTemplate)(verifyEmailLink, user.firstName)
            });
            if (error) {
                if (configs_1.environmentConfig?.NODE_ENV && configs_1.environmentConfig.NODE_ENV === 'development') {
                    console.log('Sending Email error:', error);
                    console.log('Sending Email error:');
                }
            }
            else if (configs_1.environmentConfig?.NODE_ENV && configs_1.environmentConfig.NODE_ENV === 'development') {
                console.log(`Successfully  send email to ${email}...`);
                console.log(resendEmailData);
            }
            const responseData = {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                verifyEmailLink
            };
            return res.status(401).json((0, utils_1.customResponse)({
                data: responseData,
                success: false,
                error: true,
                message: `Your Email has not been verified. An Email with Verification link has been sent to your account ${user.email} Please Verify Your Email first or use the email verification lik which is been send with the response to verfiy your email`,
                status: 401
            }));
        }
        const { password: pass, confirmPassword, isVerified, isDeleted, status, acceptTerms, ...otherUserInfo } = user._doc;
        const data = {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            authToken: token.accessToken
        };
        res.cookie('accessToken', token.accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'
        });
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'Auth logged in successful.',
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.loginService = loginService;
const logoutService = async (req, res, next) => {
    const { refreshToken } = req.body;
    try {
        const token = await Token_model_1.default.findOne({
            refreshToken
        });
        if (!token) {
            return next(new http_errors_1.default.BadRequest());
        }
        const userId = await (0, middlewares_1.verifyRefreshToken)(refreshToken);
        if (!userId) {
            return next(new http_errors_1.default.BadRequest());
        }
        await Token_model_1.default.deleteOne({
            refreshToken
        });
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json((0, utils_1.customResponse)({
            data: null,
            success: true,
            error: false,
            message: 'Successfully logged out 😏 🍀',
            status: 200
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.logoutService = logoutService;
const refreshTokenService = async (req, res, next) => {
    const { refreshToken } = req.body;
    try {
        let token = await Token_model_1.default.findOne({
            refreshToken
        });
        if (!token) {
            return next(new http_errors_1.default.BadRequest());
        }
        const userId = await (0, middlewares_1.verifyRefreshToken)(refreshToken);
        if (!userId) {
            return next(new http_errors_1.default.BadRequest());
        }
        const generatedAccessToken = await token.generateToken({
            userId
        }, configs_1.environmentConfig.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: configs_1.environmentConfig.ACCESS_TOKEN_KEY_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(userId)
        });
        const generatedRefreshToken = await token.generateToken({
            userId
        }, configs_1.environmentConfig.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: configs_1.environmentConfig.REFRESH_TOKEN_KEY_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(userId)
        });
        token.refreshToken = generatedRefreshToken;
        token.accessToken = generatedAccessToken;
        token = await token.save();
        const data = {
            user: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            }
        };
        res.cookie('accessToken', token.accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'
        });
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json((0, utils_1.customResponse)({
            data,
            success: true,
            error: false,
            message: 'Auth logged in successful.',
            status: 200
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.refreshTokenService = refreshTokenService;
const updateAccountService = async (req, res, next) => {
    const { firstName, lastName, dateOfBirth, email, bio, skills, profileUrl, acceptTerms, phoneNumber, gender } = req.body;
    try {
        const user = await User_model_1.default.findById(req.params.userId);
        if (!user) {
            return next(new http_errors_1.default.BadRequest());
        }
        if (!req.user?._id.equals(user._id)) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        if (email) {
            const existingUser = await User_model_1.default.findOne({ email: new RegExp(`^${email}$`, 'i') });
            if (existingUser && !existingUser._id.equals(user._id)) {
                if (req.file?.filename) {
                    const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file.filename}`;
                    (0, utils_1.deleteFile)(localFilePath);
                }
                return next((0, http_errors_1.default)(422, `E-Mail address ${email} is already exists, please pick a different one.`));
            }
        }
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.gender = gender || user.gender;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.acceptTerms = acceptTerms || user.acceptTerms;
        user.bio = bio || user.bio;
        user.profileUrl = profileUrl || user.profileUrl;
        user.skills = skills || user.skills;
        const updatedUser = await user.save({ validateBeforeSave: false, new: true });
        if (!updatedUser) {
            return next((0, http_errors_1.default)(422, `Failed to update user by given ID ${req.params.userId}`));
        }
        const { password: pass, confirmPassword, isVerified, isDeleted, status, acceptTerms: acceptTerm, role, ...otherUserInfo } = updatedUser._doc;
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully updated user by ID: ${req.params.userId}`,
            status: 200,
            data: { user: otherUserInfo }
        }));
    }
    catch (error) {
        console.log(error);
        return next(http_errors_1.InternalServerError);
    }
};
exports.updateAccountService = updateAccountService;
const deleteAccountService = async (req, res, next) => {
    try {
        const user = await User_model_1.default.findById(req.params.userId);
        if (!user) {
            return next(new http_errors_1.default.BadRequest());
        }
        const reqUser = req.user;
        if (reqUser && reqUser._id.equals(user._id) && reqUser.role === constants_1.AUTHORIZATION_ROLES.ADMIN) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Admin can't remove themselves from admin, please ask another admin)`));
        }
        if (reqUser && !reqUser?._id.equals(user._id) && reqUser?.role !== constants_1.AUTHORIZATION_ROLES.ADMIN) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        const deletedUser = await User_model_1.default.findByIdAndDelete({
            _id: req.params.userId
        });
        if (!deletedUser) {
            return next((0, http_errors_1.default)(422, `Failed to delete user by given ID ${req.params.userId}`));
        }
        return res.status(200).json((0, utils_1.customResponse)({
            data: null,
            success: true,
            error: false,
            message: `Successfully deleted user by ID ${req.params.userId}`,
            status: 200
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.deleteAccountService = deleteAccountService;
const getProfileService = async (req, res, next) => {
    try {
        const user = await User_model_1.default.findById(req.user?._id)
            .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified')
            .populate('following', 'firstName  lastName  profileUrl bio')
            .populate('followers', 'firstName  lastName  profileUrl bio')
            .populate('blocked', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!user) {
            return next((0, http_errors_1.default)(401, `Auth Failed `));
        }
        const { password: pass, confirmPassword, isVerified, isDeleted, status, acceptTerms, ...otherUserInfo } = user._doc;
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'Successfully found user profile 🍀',
            status: 200,
            data: { user: otherUserInfo }
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.getProfileService = getProfileService;
const verifyEmailService = async (req, res, next) => {
    try {
        const user = await User_model_1.default.findById(req.params.userId);
        if (!user)
            return next((0, http_errors_1.default)(400, 'Email verification token is invalid or has expired. Please click on resend for verify your Email.'));
        if (user.isVerified && user.status === 'active') {
            return res.status(200).send((0, utils_1.customResponse)({
                data: null,
                success: true,
                error: false,
                message: `Your email has already been verified. Please Login..`,
                status: 200
            }));
        }
        const emailVerificationToken = await Token_model_1.default.findOne({
            userId: user._id,
            refreshToken: req.params.token
        });
        if (!emailVerificationToken) {
            return next((0, http_errors_1.default)(400, 'Email verification token is invalid or has expired.'));
        }
        user.isVerified = true;
        user.status = 'active';
        user.acceptTerms = true;
        await user.save();
        await Token_model_1.default.deleteOne({ _id: emailVerificationToken._id });
        return res.status(200).json((0, utils_1.customResponse)({
            data: null,
            success: true,
            error: false,
            message: 'Your account has been successfully verified . Please Login. ',
            status: 200
        }));
    }
    catch (error) {
        console.log(error);
        return next(http_errors_1.InternalServerError);
    }
};
exports.verifyEmailService = verifyEmailService;
const forgotPasswordService = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User_model_1.default.findOne({ email });
        if (!user) {
            const message = `The email address ${email} is not associated with any account. Double-check your email address and try again.`;
            return next((0, http_errors_1.default)(401, message));
        }
        let token = await Token_model_1.default.findOne({ userId: user._id });
        if (!token) {
            token = await new Token_model_1.default({ userId: user._id });
            token = await token.save();
        }
        const generatedAccessToken = await token.generateToken({
            userId: user._id
        }, configs_1.environmentConfig.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: configs_1.environmentConfig.ACCESS_TOKEN_KEY_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(user._id)
        });
        const generatedRefreshToken = await token.generateToken({
            userId: user._id
        }, configs_1.environmentConfig.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: configs_1.environmentConfig.REST_PASSWORD_LINK_EXPIRE_TIME,
            issuer: configs_1.environmentConfig.JWT_ISSUER,
            audience: String(user._id)
        });
        token.refreshToken = generatedRefreshToken;
        token.accessToken = generatedAccessToken;
        token = await token.save();
        const passwordResetEmailLink = `${configs_1.environmentConfig.WEBSITE_URL}/reset-password?id=${user._id}&token=${token.refreshToken}`;
        const { data: resendEmailData, error } = await (0, utils_1.sendMail)({
            to: user.email,
            ...(0, utils_1.sendResetPasswordEmailTemplate)(passwordResetEmailLink, user.firstName)
        });
        if (error) {
            if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
                console.log('Sending Email error:', error);
                console.log('Sending Email error:');
            }
        }
        else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log(`Successfully  send email to ${email}...`);
            console.log(resendEmailData);
        }
        const data = {
            user: {
                resetPasswordToken: passwordResetEmailLink
            }
        };
        return res.status(200).json((0, utils_1.customResponse)({
            data,
            success: true,
            error: false,
            message: `Auth success. An Email with Rest password link has been sent to your account ${email}  please check to rest your password or use the the link which is been send with the response body to rest your password`,
            status: 200
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.forgotPasswordService = forgotPasswordService;
const resetPasswordService = async (req, res, next) => {
    try {
        const user = await User_model_1.default.findById(req.params.userId);
        if (!user)
            return next((0, http_errors_1.default)(401, `Password reset token is invalid or has expired.`));
        const token = await Token_model_1.default.findOne({ userId: req.params.userId, refreshToken: req.params.token });
        if (!token)
            return next((0, http_errors_1.default)(401, 'Password reset token is invalid or has expired.'));
        const userId = await (0, middlewares_1.verifyRefreshToken)(req.params.token);
        if (!userId) {
            return next(new http_errors_1.default.BadRequest());
        }
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        await user.save();
        await Token_model_1.default.deleteOne({ userId: req.params.userId, refreshToken: req.params.token });
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        const confirmResetPasswordEmailLink = `${configs_1.environmentConfig.WEBSITE_URL}/login`;
        const { data: resendEmailData, error } = await (0, utils_1.sendMail)({
            to: user.email,
            ...(0, utils_1.sendConfirmResetPasswordEmailTemplate)(confirmResetPasswordEmailLink, user.firstName)
        });
        if (error) {
            if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
                console.log('Sending Email error:', error);
                console.log('Sending Email error:');
            }
        }
        else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log(`Successfully  send email to ${user.email}...`);
            console.log(resendEmailData);
        }
        const data = {
            loginLink: confirmResetPasswordEmailLink
        };
        return res.status(200).json((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Your password has been Password Reset Successfully updated please login`,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.resetPasswordService = resetPasswordService;
//# sourceMappingURL=auth.service.js.map