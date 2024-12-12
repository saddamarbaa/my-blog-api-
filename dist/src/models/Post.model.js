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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("@src/constants");
exports.PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please provide a title'],
        minLength: [3, "Title can't be shorter than 3 characters"],
        maxLength: [100, "Title can't exceed 100 characters"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please provide a post description'],
        minLength: [5, 'Description must be at least 5 characters long'],
        maxLength: [5000, "Description can't exceed 5000 characters"]
    },
    photoUrl: {
        type: String,
        required: [true, 'Post image URL is required']
    },
    cloudinary_id: {
        type: String
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    category: {
        type: String,
        enum: {
            values: [
                constants_1.POST_CATEGORY.BLOCKCHAIN,
                constants_1.POST_CATEGORY.CODING,
                constants_1.POST_CATEGORY.DEVAPP,
                constants_1.POST_CATEGORY.NEXTJS,
                constants_1.POST_CATEGORY.NODEJS,
                constants_1.POST_CATEGORY.REACTJS,
                constants_1.POST_CATEGORY.SPORTS,
                constants_1.POST_CATEGORY.TYPESCRIPT,
                constants_1.POST_CATEGORY.SOCIAL,
                constants_1.POST_CATEGORY.ALL
            ],
            message: 'Invalid category. Please select from the available options.'
        },
        default: constants_1.POST_CATEGORY.ALL,
        trim: true,
        lowercase: true,
        required: [true, 'Category is required']
    },
    likes: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User is required to like the post']
            }
        }
    ],
    disLikes: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User is required to dislike the post']
            }
        }
    ],
    shares: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User is required to share the post']
            }
        }
    ],
    views: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User is required to view the post']
            }
        }
    ],
    comments: [
        {
            comment: {
                type: String,
                required: [true, 'Comment content is required'],
                trim: true
            },
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User is required for the comment']
            }
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
exports.PostSchema.pre(/^find/, function (next) {
    exports.PostSchema.virtual('viewsCount').get(function () {
        return this.views?.length;
    });
    exports.PostSchema.virtual('likesCount').get(function () {
        return this.likes?.length;
    });
    exports.PostSchema.virtual('disLikesCount').get(function () {
        return this.disLikes?.length;
    });
    exports.PostSchema.virtual('likesPercentage').get(function () {
        const total = this.likes.length + this.disLikes.length;
        if (total === 0)
            return '0%';
        const percentage = (this.likes.length / total) * 100;
        return `${percentage.toFixed(2)}%`;
    });
    exports.PostSchema.virtual('disLikesPercentage').get(function () {
        const total = this.likes.length + this.disLikes.length;
        if (total === 0)
            return '0%';
        const percentage = (this.disLikes.length / total) * 100;
        return `${percentage.toFixed(2)}%`;
    });
    exports.PostSchema.virtual('daysAgo').get(function () {
        const daysAgo = Math.floor((Date.now() - new Date(this.createdAt).getTime()) / 86400000);
        if (daysAgo === 0) {
            return 'Today';
        }
        if (daysAgo === 1) {
            return 'Yesterday';
        }
        return `${daysAgo} days ago`;
    });
    next();
});
exports.default = mongoose_1.default.models.Post || mongoose_1.default.model('Post', exports.PostSchema);
//# sourceMappingURL=Post.model.js.map