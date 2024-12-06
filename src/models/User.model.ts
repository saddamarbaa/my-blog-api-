/* eslint-disable @typescript-eslint/no-use-before-define */
import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { environmentConfig } from '@src/configs';
import {
  AUTHORIZATION_ROLES,
  GENDER_OPTIONS,
  STATUS_OPTIONS,
  USER_AWARD_OPTIONS,
  USER_PLAN_OPTIONS
} from '@src/constants';
import { IUser } from '@src/interfaces';
import Post from './Post.model';

export interface IUserDocument extends IUser {
  // document level operations
  comparePassword(password: string): Promise<boolean>;
  createJWT(): Promise<void>;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}

// Define the User schema
const UserSchema = new mongoose.Schema<IUserDocument>(
  {
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
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
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
        AUTHORIZATION_ROLES.USER,
        AUTHORIZATION_ROLES.ADMIN,
        AUTHORIZATION_ROLES.MANAGER,
        AUTHORIZATION_ROLES.MODERATOR,
        AUTHORIZATION_ROLES.SUPERVISOR,
        AUTHORIZATION_ROLES.GUIDE,
        AUTHORIZATION_ROLES.CLIENT
      ],
      default: AUTHORIZATION_ROLES.USER
    },

    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    userAward: {
      type: String,
      enum: [...USER_AWARD_OPTIONS],
      default: 'Bronze'
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: [...GENDER_OPTIONS],
        message: 'Gender must be either male, female, or other'
      }
    },
    plan: {
      type: String,
      enum: [...USER_PLAN_OPTIONS],
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
      enum: [...STATUS_OPTIONS],
      default: 'active',
      required: false,
      trim: true,
      lowercase: true
    },
    dateOfBirth: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true } // to get virtuals in json response from server to client
  }
);

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.pre('save', async function (next) {
  if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    console.log('Middleware called before saving the user is', this);
  }

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    user.confirmPassword = await bcrypt.hash(user.password, salt);
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

  return jwt.sign(payload, environmentConfig.JWT_TOKEN_SECRET as string, {
    expiresIn: environmentConfig.JWT_EXPIRE_TIME
  });
};

// Pre Hook: Populate posts and check inactivity
UserSchema.pre('findOne', async function (next) {
  // Populate the posts field when a user is retrieved
  this.populate({
    path: 'posts'
  });

  // Retrieve the user ID from the query using `this.getQuery()`
  const userId = this.getQuery()._id;

  // Fetch all posts created by the user
  const posts = await Post.find({ user: userId });

  // Get the last post created by the user
  const lastPost = posts[posts.length - 1];

  const lastPostDate = lastPost ? new Date(lastPost.createdAt) : null;
  const lastPostDateStr = lastPostDate ? lastPostDate.toDateString() : 'No posts yet';

  UserSchema.virtual('lastPostDate').get(function () {
    return lastPostDateStr;
  });

  if (lastPostDate) {
    const currentDate = new Date();

    const diffInMilliseconds: number = currentDate.getTime() - lastPostDate.getTime();
    const diffInDays: number = diffInMilliseconds / (1000 * 3600 * 24);

    UserSchema.virtual('isInactive').get(function () {
      return diffInDays > 30;
    });

    if (diffInDays > 30) {
      await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    } else {
      await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
    }

    const daysAgo = Math.floor(diffInDays);
    UserSchema.virtual('lastActive').get(function () {
      if (daysAgo <= 0) return 'Today';
      if (daysAgo === 1) return 'Yesterday';
      return `${daysAgo} days ago`;
    });
  } else {
    UserSchema.virtual('isInactive').get(function () {
      return true;
    });
  }

  const numberOfPosts = posts.length;

  if (numberOfPosts <= 0) {
    await User.findByIdAndUpdate(userId, { userAward: 'Bronze' }, { new: true });
  } else if (numberOfPosts > 10 && numberOfPosts <= 20) {
    await User.findByIdAndUpdate(userId, { userAward: 'Silver' }, { new: true });
  } else if (numberOfPosts > 20) {
    await User.findByIdAndUpdate(userId, { userAward: 'Gold' }, { new: true });
  }

  next();
});

// Get fullname
UserSchema.virtual('fullname').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// get posts count
UserSchema.virtual('postCounts').get(function () {
  return this.posts?.length;
});

// get followers count
UserSchema.virtual('followersCount').get(function () {
  return this.followers?.length;
});

// get followers count
UserSchema.virtual('followingCount').get(function () {
  return this.following?.length;
});

// get viewers count
UserSchema.virtual('viewersCount').get(function () {
  return this.viewers?.length;
});

// get blocked count
UserSchema.virtual('blockedCount').get(function () {
  return this.blocked?.length;
});

// Compile the user model
const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;

// export default models.User || mongoose.model<IUserDocument>('User', UserSchema);
