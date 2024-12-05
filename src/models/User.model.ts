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
    timestamps: true
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

export default mongoose.model<IUserDocument>('User', UserSchema);

// export default models.User || mongoose.model<IUserDocument>('User', UserSchema);
