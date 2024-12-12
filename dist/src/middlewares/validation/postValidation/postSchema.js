"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_objectid_1 = __importDefault(require("joi-objectid"));
const constants_1 = require("@src/constants");
const vaildObjectId = (0, joi_objectid_1.default)(joi_1.default);
exports.postSchema = {
    addPost: joi_1.default.object({
        filename: joi_1.default.string().optional().label('Invalid request (Please upload an image)'),
        photoUrl: joi_1.default.string().optional().uri().label('Invalid request (Please provide a valid image URL)'),
        title: joi_1.default.string().min(3).max(100).required(),
        description: joi_1.default.string().min(5).max(5000).required(),
        category: joi_1.default.string().valid(constants_1.POST_CATEGORY.BLOCKCHAIN, constants_1.POST_CATEGORY.CODING, constants_1.POST_CATEGORY.DEVAPP, constants_1.POST_CATEGORY.NEXTJS, constants_1.POST_CATEGORY.NODEJS, constants_1.POST_CATEGORY.REACTJS, constants_1.POST_CATEGORY.SPORTS, constants_1.POST_CATEGORY.TYPESCRIPT, constants_1.POST_CATEGORY.SOCIAL)
    }),
    updatePost: joi_1.default.object({
        title: joi_1.default.string().min(3).max(100),
        description: joi_1.default.string().min(5).max(5000),
        postId: vaildObjectId().required(),
        category: joi_1.default.string().valid(constants_1.POST_CATEGORY.BLOCKCHAIN, constants_1.POST_CATEGORY.CODING, constants_1.POST_CATEGORY.DEVAPP, constants_1.POST_CATEGORY.NEXTJS, constants_1.POST_CATEGORY.NODEJS, constants_1.POST_CATEGORY.REACTJS, constants_1.POST_CATEGORY.SPORTS, constants_1.POST_CATEGORY.TYPESCRIPT, constants_1.POST_CATEGORY.SOCIAL),
        filename: joi_1.default.string().optional().label('Invalid request (Please upload an image)'),
        photoUrl: joi_1.default.string().optional().uri().label('Invalid request (Please provide a valid image URL)')
    }),
    addComment: joi_1.default.object({
        comment: joi_1.default.string().min(3).max(300).required(),
        postId: vaildObjectId().required()
    }),
    updateComment: joi_1.default.object({
        comment: joi_1.default.string().min(3).max(300).required(),
        postId: vaildObjectId().required(),
        commentId: vaildObjectId().required()
    }),
    deleteComment: joi_1.default.object({
        postId: vaildObjectId().required(),
        commentId: vaildObjectId().required()
    }),
    validatedPostId: joi_1.default.object({
        postId: vaildObjectId().required()
    }),
    validatedCommentId: joi_1.default.object({
        commentId: vaildObjectId().required()
    })
};
//# sourceMappingURL=postSchema.js.map