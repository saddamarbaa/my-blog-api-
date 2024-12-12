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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("@src/configs");
const constants_1 = require("@src/constants");
const Post_model_1 = __importDefault(require("./Post.model"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Please provide first name'],
        minLength: [3, "First name can't be smaller than 3 characters"],
        maxLength: [15, "First name can't be greater than 15 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Please provide surname'],
        minLength: [3, "Surname can't be smaller than 3 characters"],
        maxLength: [15, "Surname can't be greater than 15 characters"]
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        maxLength: [128, "Email can't be greater than 128 characters"]
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [6, 'Password must be more than 6 characters'],
        trim: true,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide confirmed Password'],
        minlength: [6, 'Password must be more than 6 characters'],
        trim: true,
        select: false
    },
    bio: {
        type: String,
        maxLength: [500, "Bio can't be longer than 500 characters"],
        trim: true
    },
    skills: {
        type: [String],
        default: []
    },
    profileUrl: {
        type: String,
        trim: true,
        default: 'https://tse3.mm.bing.net/th?id=OIP.W4S-DdCjOjUS4LqYNUieYwHaHa&pid=Api&P=0&h=220'
    },
    acceptTerms: { type: Boolean, required: false, default: false },
    confirmationCode: {
        type: String,
        required: false,
        index: true,
        unique: true,
        sparse: true
    },
    friends: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        trim: true,
        lowercase: true,
        enum: [
            constants_1.AUTHORIZATION_ROLES.USER,
            constants_1.AUTHORIZATION_ROLES.ADMIN,
            constants_1.AUTHORIZATION_ROLES.MANAGER,
            constants_1.AUTHORIZATION_ROLES.MODERATOR,
            constants_1.AUTHORIZATION_ROLES.SUPERVISOR,
            constants_1.AUTHORIZATION_ROLES.GUIDE,
            constants_1.AUTHORIZATION_ROLES.CLIENT
        ],
        default: constants_1.AUTHORIZATION_ROLES.USER
    },
    viewers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    blocked: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    userAward: {
        type: String,
        enum: [...constants_1.USER_AWARD_OPTIONS],
        default: 'Bronze'
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        enum: {
            values: [...constants_1.GENDER_OPTIONS],
            message: 'Gender must be either male, female, or other'
        }
    },
    plan: {
        type: String,
        enum: [...constants_1.USER_PLAN_OPTIONS],
        default: 'Free'
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number']
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: true,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: [...constants_1.STATUS_OPTIONS],
        default: 'active',
        required: false,
        trim: true,
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt_1.default.compare(candidatePassword, this.password);
    return isMatch;
};
UserSchema.pre('save', async function (next) {
    if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
        console.log('Middleware called before saving the user is', this);
    }
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt_1.default.genSalt(12);
        user.password = await bcrypt_1.default.hash(user.password, salt);
        user.confirmPassword = await bcrypt_1.default.hash(user.password, salt);
    }
    next();
});
UserSchema.post('save', function () {
    if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
        console.log('Middleware called after saving the user is (User is been Save )', this);
    }
});
UserSchema.methods.createJWT = function () {
    const payload = {
        userId: this._id,
        email: this.email,
        name: this.firstName,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        role: this.role
    };
    return jsonwebtoken_1.default.sign(payload, configs_1.environmentConfig.JWT_TOKEN_SECRET, {
        expiresIn: configs_1.environmentConfig.JWT_EXPIRE_TIME
    });
};
UserSchema.pre('findOne', async function (next) {
    this.populate({
        path: 'posts'
    });
    const userId = this.getQuery()._id;
    const posts = await Post_model_1.default.find({ user: userId });
    const lastPost = posts[posts.length - 1];
    const lastPostDate = lastPost ? new Date(lastPost.createdAt) : null;
    const lastPostDateStr = lastPostDate ? lastPostDate.toDateString() : 'No posts yet';
    UserSchema.virtual('lastPostDate').get(function () {
        return lastPostDateStr;
    });
    if (lastPostDate) {
        const currentDate = new Date();
        const diffInMilliseconds = currentDate.getTime() - lastPostDate.getTime();
        const diffInDays = diffInMilliseconds / (1000 * 3600 * 24);
        UserSchema.virtual('isInactive').get(function () {
            return diffInDays > 30;
        });
        if (diffInDays > 30) {
            await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
        }
        else {
            await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
        }
        const daysAgo = Math.floor(diffInDays);
        UserSchema.virtual('lastActive').get(function () {
            if (daysAgo <= 0)
                return 'Today';
            if (daysAgo === 1)
                return 'Yesterday';
            return `${daysAgo} days ago`;
        });
    }
    else {
        UserSchema.virtual('isInactive').get(function () {
            return true;
        });
    }
    const numberOfPosts = posts.length;
    if (numberOfPosts <= 0) {
        await User.findByIdAndUpdate(userId, { userAward: 'Bronze' }, { new: true });
    }
    else if (numberOfPosts > 10 && numberOfPosts <= 20) {
        await User.findByIdAndUpdate(userId, { userAward: 'Silver' }, { new: true });
    }
    else if (numberOfPosts > 20) {
        await User.findByIdAndUpdate(userId, { userAward: 'Gold' }, { new: true });
    }
    next();
});
UserSchema.virtual('fullname').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
UserSchema.virtual('postCounts').get(function () {
    return this.posts?.length;
});
UserSchema.virtual('followersCount').get(function () {
    return this.followers?.length;
});
UserSchema.virtual('followingCount').get(function () {
    return this.following?.length;
});
UserSchema.virtual('viewersCount').get(function () {
    return this.viewers?.length;
});
UserSchema.virtual('blockedCount').get(function () {
    return this.blocked?.length;
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.model.js.map