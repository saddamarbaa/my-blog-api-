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
exports.deleteUserCommentInPostService = exports.deleteAllCommentInPostService = exports.deleteCommentInPostService = exports.getAllCommentInPostService = exports.getUserCommentInPostService = exports.getCommentInPostService = exports.updateCommentInPostService = exports.addCommentInPostService = exports.likePostService = exports.deleteUserPostsService = exports.getUserPostsService = exports.deletePostService = exports.getTimelinePostsService = exports.getPostService = exports.getPostsService = exports.updatePostService = exports.createPostService = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const User_model_1 = __importDefault(require("@src/models/User.model"));
const Post_model_1 = __importDefault(require("@src/models/Post.model"));
const utils_1 = require("@src/utils");
const middlewares_1 = require("@src/middlewares");
const constants_1 = require("@src/constants");
const createPostService = async (req, res, next) => {
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
                author: {
                    _id: req?.user?._id || '',
                    firstName: req?.user?.firstName || '',
                    lastName: req?.user?.lastName || '',
                    profileUrl: req?.user?.profileUrl || ''
                }
            },
            request: {
                type: 'Get',
                description: 'Get all posts',
                url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
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
exports.createPostService = createPostService;
const updatePostService = async (req, res, next) => {
    const { title, description, category, photoUrl } = req.body;
    try {
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
        if (!req.user?._id.equals(post.author._id) && req?.user?.role !== 'admin') {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
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
                author: {
                    _id: req?.user?._id || '',
                    firstName: req?.user?.firstName || '',
                    lastName: req?.user?.lastName || '',
                    profileUrl: req?.user?.profileUrl || ''
                },
                request: {
                    type: 'Get',
                    description: 'Get all posts',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
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
exports.updatePostService = updatePostService;
const getPostsService = async (_req, res) => {
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
        responseObject.posts = results.map((postDoc) => {
            return {
                ...postDoc._doc,
                request: {
                    type: 'Get',
                    description: 'Get one post with the id',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/${postDoc._doc._id}`
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
exports.getPostsService = getPostsService;
const getPostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findOne({
            _id: req.params.postId
        })
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
        const data = {
            post: {
                ...post._doc,
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
            message: `Successfully found post by ID: ${req.params.postId}`,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.getPostService = getPostService;
const getTimelinePostsService = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const user = await User_model_1.default.findById(userId).populate('friends following').exec();
        const friendsIds = user?.friends.map((friend) => friend._id);
        const followingIds = user?.following.map((following) => following._id);
        const userIds = [...friendsIds, ...followingIds, userId];
        const posts = await Post_model_1.default.find({ author: { $in: userIds } })
            .select('-cloudinary_id')
            .sort({ createdAt: -1 })
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        const postsWithRequests = posts.map((postDoc) => {
            return {
                ...postDoc._doc,
                request: {
                    type: 'Get',
                    description: 'Get one post with the id',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/${postDoc._doc._id}`
                }
            };
        });
        if (!posts) {
            return next(new http_errors_1.default.BadRequest());
        }
        const data = {
            posts: postsWithRequests
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: posts.length ? 'Successful Found posts' : 'No post found',
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.getTimelinePostsService = getTimelinePostsService;
const deletePostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findById(req.params.postId).populate('author').exec();
        if (!post) {
            return next(new http_errors_1.default.BadRequest());
        }
        if (!req.user?._id.equals(post.author._id) && req?.user?.role !== constants_1.AUTHORIZATION_ROLES.ADMIN) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        const isDeleted = await Post_model_1.default.findByIdAndDelete({
            _id: req.params.postId
        });
        if (!isDeleted) {
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
exports.deletePostService = deletePostService;
const getUserPostsService = async (req, res, next) => {
    try {
        const posts = await Post_model_1.default.find({
            author: req?.user?._id
        })
            .select('-cloudinary_id')
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        const postsWithRequests = posts.map((postDoc) => {
            return {
                ...postDoc._doc,
                request: {
                    type: 'Get',
                    description: 'Get one post with the id',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/${postDoc._doc._id}`
                }
            };
        });
        const data = {
            posts: postsWithRequests
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: posts.length
                ? `Successfully found all posts for user by ID ${req?.user?._id}`
                : `No post found for user by ID ${req?.user?._id}`,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.getUserPostsService = getUserPostsService;
const deleteUserPostsService = async (req, res, next) => {
    try {
        const posts = await Post_model_1.default.find({
            author: req?.user?._id || ''
        })
            .populate('author')
            .exec();
        if (!posts || !posts.length) {
            return next(new http_errors_1.default.BadRequest());
        }
        const droppedUserPost = await Post_model_1.default.deleteMany({
            author: req?.user?._id
        });
        if (droppedUserPost.deletedCount === 0) {
            return next((0, http_errors_1.default)(400, `Failed to delete post for given user by ID ${req?.user?._id}`));
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
            message: `Successfully deleted all posts for user by ID ${req?.user?._id}`,
            status: 200
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.deleteUserPostsService = deleteUserPostsService;
const likePostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findById(req.params.postId);
        if (!post) {
            return next(new http_errors_1.default.BadRequest());
        }
        const isAlreadyLiked = post.likes.some(function (like) {
            if (like?.user.toString() === req.user?._id.toString())
                return true;
            return false;
        });
        if (!isAlreadyLiked) {
            await post.updateOne({
                $push: {
                    likes: {
                        user: req.user?._id
                    }
                }
            });
        }
        else {
            await post.updateOne({ $pull: { likes: { user: req.user?._id } } });
        }
        const updatedPost = await Post_model_1.default.findById(req.params.postId)
            .select('-cloudinary_id')
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        const data = {
            post: {
                ...updatedPost._doc,
                request: {
                    type: 'Get',
                    description: 'Get all posts',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
                }
            }
        };
        const message = isAlreadyLiked
            ? `Successfully disliked post by ID: ${req.params.postId}`
            : `Successfully liked post by ID: ${req.params.postId}`;
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.likePostService = likePostService;
const addCommentInPostService = async (req, res, next) => {
    try {
        const { postId, comment } = req.body;
        const newComment = {
            comment,
            user: req.user?._id
        };
        const post = await Post_model_1.default.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    $each: [newComment],
                    $position: 0
                }
            }
        }, {
            new: true
        })
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
        const data = {
            post: {
                ...post._doc,
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
            message: `Successfully add comment to post by ID : ${postId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.addCommentInPostService = addCommentInPostService;
const updateCommentInPostService = async (req, res, next) => {
    try {
        const { postId, commentId, comment } = req.body;
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
        const isAlreadyComment = post.comments.find((item) => item.user?._id.toString() === req.user?._id.toString() && item?._id.toString() === commentId.toString());
        if (!isAlreadyComment) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        post.comments.forEach((item, index) => {
            if (item?._id.toString() === commentId.toString()) {
                const newComment = {
                    user: item.user,
                    _id: item._id,
                    comment
                };
                post.comments[index] = newComment;
            }
        });
        await post.save();
        const data = {
            post: {
                ...post._doc,
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
            message: `Successfully update comment  by ID : ${commentId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.updateCommentInPostService = updateCommentInPostService;
const getCommentInPostService = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
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
        const isCommentExists = post.comments.find((item) => item?._id.toString() === commentId.toString());
        if (!isCommentExists) {
            return next(new http_errors_1.default.BadRequest());
        }
        post.comments = post.comments.filter((item) => item.user?._id.toString() === req.user?._id.toString() && item?._id.toString() === commentId.toString());
        const { comments } = post._doc;
        const data = {
            comment: comments,
            request: {
                type: 'Get',
                description: 'Get all posts',
                url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
            }
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully found comment by ID : ${commentId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.getCommentInPostService = getCommentInPostService;
const getUserCommentInPostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findById(req.params.postId)
            .select('-cloudinary_id')
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!post || !post.comments.length) {
            return next(new http_errors_1.default.BadRequest());
        }
        const isAlreadyComment = post.comments.find((com) => com.user?._id.toString() === req.user?._id.toString());
        if (!isAlreadyComment) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        post.comments = post.comments.filter((com) => com.user?._id.toString() === req.user?._id.toString());
        const comments = post.comments.map((commentDoc) => {
            return {
                ...commentDoc._doc,
                request: {
                    type: 'Get',
                    description: 'Get one comment with the id',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/comment/${req.params.postId}/${commentDoc._doc._id}`
                }
            };
        });
        const data = {
            comments
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully found all your comment in post by ID : ${req.params.postId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.getUserCommentInPostService = getUserCommentInPostService;
const getAllCommentInPostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findById(req.params.postId)
            .select('-cloudinary_id')
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!post || !post.comments.length) {
            return next(new http_errors_1.default.BadRequest());
        }
        const comments = post.comments.map((commentDoc) => {
            return {
                ...commentDoc._doc,
                request: {
                    type: 'Get',
                    description: 'Get one comment with the id',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/comment/${req.params.postId}/${commentDoc._doc._id}`
                }
            };
        });
        const data = {
            comments
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully found all comments for post by ID : ${req.params.postId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.getAllCommentInPostService = getAllCommentInPostService;
const deleteCommentInPostService = async (req, res, next) => {
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
        if (!post || !post?.comments?.length) {
            return next(new http_errors_1.default.BadRequest());
        }
        const isAuthorized = post.comments.find((item) => (req.user?._id.equals(post.author._id) || item.user?._id.toString() === req.user?._id.toString()) &&
            item?._id.toString() === commentId.toString());
        if (!isAuthorized) {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        post.comments = post.comments.filter((item) => item?._id.toString() !== commentId?.toString());
        await post.save();
        const data = {
            post: {
                ...post._doc,
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
exports.deleteCommentInPostService = deleteCommentInPostService;
const deleteAllCommentInPostService = async (req, res, next) => {
    try {
        const post = await Post_model_1.default.findById(req.params.postId)
            .select('-cloudinary_id')
            .populate('author', 'firstName  lastName  profileUrl bio')
            .populate('likes.user', 'firstName  lastName  profileUrl bio')
            .populate('disLikes', 'firstName  lastName  profileUrl bio')
            .populate('comments.user', 'firstName  lastName  profileUrl bio')
            .populate('views', 'firstName  lastName  profileUrl bio')
            .populate('shares', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!post || !post?.comments?.length) {
            return next(new http_errors_1.default.BadRequest());
        }
        if (!req.user?._id.equals(post.author._id) && req?.user?.role !== 'admin') {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        post.comments = [];
        await post.save();
        const data = {
            post: {
                ...post._doc,
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
exports.deleteAllCommentInPostService = deleteAllCommentInPostService;
const deleteUserCommentInPostService = async (req, res, next) => {
    try {
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
        if (req?.body?.userId) {
            const user = await User_model_1.default.findById(req.body.userId);
            if (!user) {
                return next((0, http_errors_1.default)(403));
            }
        }
        const isAlreadyComment = post.comments.find((item) => item.user?._id.toString() === req?.body?.userId ? req?.body?.userId?.toString() : req.user?._id.toString());
        if (!isAlreadyComment && !req.user?._id.equals(post.author._id) && req?.user?.role !== 'admin') {
            return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
        }
        post.comments = post.comments.filter((item) => item.user?._id.toString() !== (req?.body?.userId ? req?.body?.userId?.toString() : req.user?._id.toString()));
        await post.save();
        const data = {
            post: {
                ...post._doc,
                request: {
                    type: 'Get',
                    description: 'Get all comments',
                    url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/comment/${req.params.postId}`
                }
            }
        };
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Successfully deleted all user comments in post by ID : ${req.params.postId} `,
            status: 200,
            data
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.deleteUserCommentInPostService = deleteUserCommentInPostService;
//# sourceMappingURL=post.service.js.map