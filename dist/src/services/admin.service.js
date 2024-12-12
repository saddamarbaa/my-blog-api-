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
exports.adminDeleteCommentInPostService = exports.adminDeleteAllCommentInPostService = exports.adminUpdatePostService = exports.adminClearAllPostsService = exports.adminDeleteAllPostForGivenUserService = exports.adminDeletePostService = exports.adminCreatePostService = exports.adminGetPostService = exports.adminGetPostsService = exports.adminGetUserService = exports.adminGetUsersService = exports.adminUpdateAuthService = exports.adminAddUserService = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const Token_model_1 = __importDefault(require("@src/models/Token.model"));
const User_model_1 = __importDefault(require("@src/models/User.model"));
const Post_model_1 = __importDefault(require("@src/models/Post.model"));
const middlewares_1 = require("@src/middlewares");
const utils_1 = require("@src/utils");
const configs_1 = require("@src/configs");
const constants_1 = require("@src/constants");
const adminAddUserService = async (req, res, next) => {
    const { firstName, lastName, dateOfBirth, email, bio, skills, profileUrl, acceptTerms, phoneNumber, gender, role, password, confirmPassword } = req.body;
    try {
        const isEmailExit = await User_model_1.default.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if (isEmailExit) {
            if (req.file?.filename) {
                const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file.filename}`;
                (0, utils_1.deleteFile)(localFilePath);
            }
            return next((0, http_errors_1.default)(422, `E-Mail address ${email} is already exists, please pick a different one.`));
        }
        let cloudinaryResult;
        if (req.file?.filename) {
            const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;
            cloudinaryResult = await middlewares_1.cloudinary.uploader.upload(localFilePath, {
                folder: 'users'
            });
            (0, utils_1.deleteFile)(localFilePath);
        }
        const finalUserProfilePic = (0, utils_1.getProfilePicture)(firstName, lastName, gender, profileUrl);
        const finalRole = (0, utils_1.getRoleFromEmail)(email);
        const newUser = new User_model_1.default({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            bio,
            phoneNumber,
            dateOfBirth,
            role: role || finalRole,
            profileUrl: finalUserProfilePic,
            skills: skills || [],
            cloudinary_id: cloudinaryResult?.public_id,
            acceptTerms: acceptTerms || true
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
        const [accessToken, refreshToken] = await Promise.all([
            token.generateToken(payload, accessTokenSecretKey, accessTokenOptions),
            token.generateToken(payload, refreshTokenSecretKey, refreshTokenOptions)
        ]);
        token.refreshToken = accessToken;
        token.accessToken = refreshToken;
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
        if (req.file?.filename) {
            const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;
            (0, utils_1.deleteFile)(localFilePath);
        }
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminAddUserService = adminAddUserService;
const adminUpdateAuthService = async (req, res, next) => {
    const { firstName, lastName, dateOfBirth, email, bio, skills, profileUrl, acceptTerms, phoneNumber, gender, status, role, plan, userAward } = req.body;
    try {
        const user = await User_model_1.default.findById(req.params.userId);
        if (!user) {
            return next(new http_errors_1.default.BadRequest());
        }
        const reqUser = req.user;
        if (req.body.role && reqUser && reqUser._id.equals(user._id) && reqUser.role === constants_1.AUTHORIZATION_ROLES.ADMIN) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Admin cant update themselves from admin , please ask another admin)`));
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
        if (req.file?.filename && user.cloudinary_id) {
            await middlewares_1.cloudinary.uploader.destroy(user.cloudinary_id);
        }
        let cloudinaryResult;
        if (req.file?.filename) {
            const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;
            cloudinaryResult = await middlewares_1.cloudinary.uploader.upload(localFilePath, {
                folder: 'users'
            });
            (0, utils_1.deleteFile)(localFilePath);
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
        user.role = role || user.role;
        user.status = status || user.status;
        user.plan = plan || user.plan;
        user.userAward = userAward || user.userAward;
        user.cloudinary_id = req.file?.filename ? cloudinaryResult?.public_id : user.cloudinary_id;
        const updatedUser = await user.save({ validateBeforeSave: false, new: true });
        if (!updatedUser) {
            return next((0, http_errors_1.default)(422, `Failed to update user by given ID ${req.params.userId}`));
        }
        const { password: pass, confirmPassword, isVerified, isDeleted, status: stas, acceptTerms: acceptTerm, role: roles, ...otherUserInfo } = updatedUser._doc;
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully updated user by ID: ${req.params.userId}`,
            status: 200,
            data: { user: otherUserInfo }
        }));
    }
    catch (error) {
        if (req.file?.filename) {
            const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;
            (0, utils_1.deleteFile)(localFilePath);
        }
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminUpdateAuthService = adminUpdateAuthService;
const adminGetUsersService = async (_req, res) => {
    if (res?.paginatedResults) {
        const { results, next, previous, currentPage, totalDocs, totalPages, lastPage } = res.paginatedResults;
        const responseObject = {
            totalDocs: totalDocs || 0,
            totalPages: totalPages || 0,
            lastPage: lastPage || 0,
            count: results?.length || 0,
            currentPage: currentPage || 0
        };
        if (next) {
            responseObject.nextPage = next;
        }
        if (previous) {
            responseObject.prevPage = previous;
        }
        responseObject.users = results?.map((userDoc) => {
            return {
                ...userDoc._doc,
                request: {
                    type: 'Get',
                    description: 'Get user info',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/users/${userDoc._doc._id}`
                }
            };
        });
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'Successful Found users',
            status: 200,
            data: responseObject
        }));
    }
};
exports.adminGetUsersService = adminGetUsersService;
const adminGetUserService = async (req, res, next) => {
    if (!(0, utils_1.isValidMongooseObjectId)(req.params.userId) || !req.params.userId) {
        return next((0, http_errors_1.default)(422, `Invalid request`));
    }
    try {
        const user = await User_model_1.default.findById(req.params.userId);
        if (!user) {
            return next(new http_errors_1.default.BadRequest());
        }
        const { password, confirmPassword, ...otherUserInfo } = user._doc;
        const data = {
            user: {
                ...otherUserInfo,
                request: {
                    type: 'Get',
                    description: 'Get all the user',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/users`
                }
            }
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully found user by ID: ${req.params.userId} profile 🍀`,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminGetUserService = adminGetUserService;
const adminGetPostsService = async (_req, res) => {
    if (res?.paginatedResults) {
        const { results, next, previous, currentPage, totalDocs, totalPages, lastPage } = res.paginatedResults;
        const responseObject = {
            totalDocs: totalDocs || 0,
            totalPages: totalPages || 0,
            lastPage: lastPage || 0,
            count: results?.length || 0,
            currentPage: currentPage || 0
        };
        if (next) {
            responseObject.nextPage = next;
        }
        if (previous) {
            responseObject.prevPage = previous;
        }
        responseObject.posts = results?.map((postDoc) => {
            const { author, ...otherPostInfo } = postDoc._doc;
            return {
                ...otherPostInfo,
                creator: author,
                request: {
                    type: 'Get',
                    description: 'Get one post with the id',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/feed/posts/${postDoc._doc._id}`
                }
            };
        });
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: responseObject.posts.length ? 'Successful Found posts' : 'No post found',
            status: 200,
            data: responseObject
        }));
    }
};
exports.adminGetPostsService = adminGetPostsService;
const adminGetPostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findById(req.params.postId)
            .populate('author')
            .populate('likes.user')
            .populate('comments.user')
            .exec();
        if (!post) {
            return next(new http_errors_1.default.BadRequest());
        }
        const { author, ...otherPostInfo } = post._doc;
        const data = {
            post: {
                ...otherPostInfo,
                author: undefined,
                creator: author,
                request: {
                    type: 'Get',
                    description: 'Get all posts',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/feed/posts`
                }
            }
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully found post by ID: ${req.params.postId}`,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminGetPostService = adminGetPostService;
const adminCreatePostService = async (req, res, next) => {
    const { title, description, category, photoUrl } = req.body;
    if (!req.file && !photoUrl) {
        return next((0, http_errors_1.default)(422, `Either an image file must be uploaded or a photo URL must be provided`));
    }
    try {
        let cloudinaryResult;
        if (req.file?.filename) {
            const localFilePath = `${process.env.PWD}/public/uploads/posts/${req.file?.filename}`;
            cloudinaryResult = await middlewares_1.cloudinary.uploader.upload(localFilePath, {
                folder: 'posts'
            });
            (0, utils_1.deleteFile)(localFilePath);
        }
        const photo = cloudinaryResult?.secure_url || photoUrl;
        const postData = new Post_model_1.default({
            title,
            description,
            category: category?.toLocaleLowerCase(),
            photoUrl: photo,
            cloudinary_id: cloudinaryResult?.public_id,
            author: req?.user?._id || ''
        });
        const createdPost = await Post_model_1.default.create(postData);
        const data = {
            post: {
                ...createdPost._doc,
                author: undefined,
                creator: req?.user
            },
            request: {
                type: 'Get',
                description: 'Get all posts',
                url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/posts`
            }
        };
        return res.status(201).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully added new post`,
            status: 201,
            data
        }));
    }
    catch (error) {
        if (req.file?.filename) {
            const localFilePath = `${process.env.PWD}/public/uploads/posts/${req.file?.filename}`;
            (0, utils_1.deleteFile)(localFilePath);
        }
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminCreatePostService = adminCreatePostService;
const adminDeletePostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findByIdAndDelete({
            _id: req.params.postId
        });
        if (!post) {
            return next((0, http_errors_1.default)(400, `Failed to delete post by given ID ${req.params.postId}`));
        }
        if (post.cloudinary_id) {
            await middlewares_1.cloudinary.uploader.destroy(post.cloudinary_id);
        }
        return res.status(200).json((0, utils_1.customResponse)({
            data: null,
            success: true,
            error: false,
            message: `Successfully deleted post by ID ${req.params.postId}`,
            status: 200
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminDeletePostService = adminDeletePostService;
const adminDeleteAllPostForGivenUserService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const posts = await Post_model_1.default.find({
            author: userId
        });
        if (!posts || !posts.length) {
            return next(new http_errors_1.default.BadRequest());
        }
        const droppedUserPost = await Post_model_1.default.deleteMany({
            author: userId
        });
        if (droppedUserPost.deletedCount === 0) {
            return next((0, http_errors_1.default)(400, `Failed to delete post for given user by ID ${userId}`));
        }
        posts.forEach(async (post) => {
            if (post?.cloudinary_id) {
                await middlewares_1.cloudinary.uploader.destroy(post?.cloudinary_id);
            }
        });
        return res.status(200).json((0, utils_1.customResponse)({
            data: null,
            success: true,
            error: false,
            message: `Successfully deleted all posts for user by ID ${userId}`,
            status: 200
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.adminDeleteAllPostForGivenUserService = adminDeleteAllPostForGivenUserService;
const adminClearAllPostsService = async (req, res, next) => {
    try {
        const posts = await Post_model_1.default.find();
        const dropCompleteCollection = await Post_model_1.default.deleteMany({});
        if (dropCompleteCollection.deletedCount === 0) {
            return next((0, http_errors_1.default)(400, `Failed to clear posts`));
        }
        posts.forEach(async (post) => {
            if (post?.cloudinary_id) {
                await middlewares_1.cloudinary.uploader.destroy(post?.cloudinary_id);
            }
        });
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successful Cleared all posts`,
            status: 200,
            data: null
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.adminClearAllPostsService = adminClearAllPostsService;
const adminUpdatePostService = async (req, res, next) => {
    try {
        const { title, description, category, photoUrl } = req.body;
        const post = await Post_model_1.default.findById(req.params.postId)
            .select('-cloudinary_id')
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!post) {
            return next(new http_errors_1.default.BadRequest());
        }
        if (post.cloudinary_id && req.file?.filename) {
            await middlewares_1.cloudinary.uploader.destroy(post.cloudinary_id);
        }
        let cloudinaryResult;
        if (req.file?.filename) {
            const localFilePath = `${process.env.PWD}/public/uploads/posts/${req.file?.filename}`;
            cloudinaryResult = await middlewares_1.cloudinary.uploader.upload(localFilePath, {
                folder: 'posts'
            });
            (0, utils_1.deleteFile)(localFilePath);
        }
        post.title = title || post.title;
        post.description = description || post.description;
        post.category = category || post.category;
        post.cloudinary_id = req.file?.filename ? cloudinaryResult?.public_id : post.cloudinary_id;
        post.photoUrl = cloudinaryResult?.secure_url || photoUrl || post.photoUrl;
        const updatedPost = await post.save({ new: true });
        const data = {
            post: {
                ...updatedPost._doc,
                author: undefined,
                creator: updatedPost._doc.author,
                request: {
                    type: 'Get',
                    description: 'Get all posts',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/posts`
                }
            }
        };
        return res.status(200).json((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully update post by ID ${req.params.postId}`,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminUpdatePostService = adminUpdatePostService;
const adminDeleteAllCommentInPostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findById(req.params.postId);
        if (!post || !post.comments.length) {
            return next(new http_errors_1.default.BadRequest());
        }
        post.comments = [];
        await post.save();
        const { author, ...otherPostInfo } = post._doc;
        const data = {
            post: {
                ...otherPostInfo,
                author: undefined,
                creator: author,
                request: {
                    type: 'Get',
                    description: 'Get all posts',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
                }
            }
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully deleted all comments in post by ID : ${req.params.postId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminDeleteAllCommentInPostService = adminDeleteAllCommentInPostService;
const adminDeleteCommentInPostService = async (req, res, next) => {
    try {
        const { postId, commentId } = req.body;
        const post = await Post_model_1.default.findById(postId)
            .select('-cloudinary_id')
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!post) {
            return next(new http_errors_1.default.BadRequest());
        }
        const commentExists = post.comments.some((item) => item._id.toString() === commentId?.toString());
        if (!commentExists) {
            return next(new http_errors_1.default.BadRequest('Comment not found'));
        }
        post.comments = post.comments.filter((item) => item?._id.toString() !== commentId?.toString());
        await post.save();
        const { author, ...otherPostInfo } = post._doc;
        const data = {
            post: {
                ...otherPostInfo,
                author: undefined,
                creator: author,
                request: {
                    type: 'Get',
                    description: 'Get all posts',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
                }
            }
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully delete comment by ID : ${commentId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.adminDeleteCommentInPostService = adminDeleteCommentInPostService;
//# sourceMappingURL=admin.service.js.map