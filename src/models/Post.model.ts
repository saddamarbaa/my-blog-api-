import mongoose, { Schema } from 'mongoose';

import { IPost } from '@src/interfaces';
import { POST_CATEGORY } from '@src/constants';

export interface IPostDocument extends IPost, Document {
  createdAt: Date;
  updatedAt: Date;
  viewsCount: number;
  likesCount: number;
  disLikesCount: number;
  likesPercentage: string;
  disLikesPercentage: string;
  daysAgo: string;
  _doc?: any;
}

export const PostSchema: Schema<IPostDocument> = new Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'] // Post must belong to a user
    },
    category: {
      type: String,
      enum: {
        values: [
          POST_CATEGORY.BLOCKCHAIN,
          POST_CATEGORY.CODING,
          POST_CATEGORY.DEVAPP,
          POST_CATEGORY.NEXTJS,
          POST_CATEGORY.NODEJS,
          POST_CATEGORY.REACTJS,
          POST_CATEGORY.SPORTS,
          POST_CATEGORY.TYPESCRIPT,
          POST_CATEGORY.SOCIAL,
          POST_CATEGORY.ALL
        ],
        message: 'Invalid category. Please select from the available options.'
      },
      default: POST_CATEGORY.ALL,
      trim: true,
      lowercase: true,
      required: [true, 'Category is required']
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'User is required to like the post']
        }
      }
    ],
    disLikes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'User is required to dislike the post']
        }
      }
    ],
    shares: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'User is required to share the post']
        }
      }
    ],
    views: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'User is required for the comment']
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
    // versionKey: false,
    // toObject: { virtuals: true }
  }
);

// Hook to add virtual fields
PostSchema.pre(/^find/, function (next) {
  // Virtual field for counting views
  PostSchema.virtual('viewsCount').get(function (this: IPostDocument) {
    return this.views?.length;
  });

  // Virtual field for counting likes
  PostSchema.virtual('likesCount').get(function (this: IPostDocument) {
    return this.likes?.length;
  });

  // Virtual field for counting dislikes
  PostSchema.virtual('disLikesCount').get(function (this: IPostDocument) {
    return this.disLikes?.length;
  });

  // Virtual field for calculating percentage of likes
  PostSchema.virtual('likesPercentage').get(function (this: IPostDocument) {
    const total = this.likes.length + this.disLikes.length;
    if (total === 0) return '0%';
    const percentage = (this.likes.length / total) * 100;
    return `${percentage.toFixed(2)}%`;
  });

  // Virtual field for calculating percentage of dislikes
  PostSchema.virtual('disLikesPercentage').get(function (this: IPostDocument) {
    const total = this.likes.length + this.disLikes.length;
    if (total === 0) return '0%';
    const percentage = (this.disLikes.length / total) * 100;
    return `${percentage.toFixed(2)}%`;
  });

  // Virtual field for showing how long ago the post was created
  PostSchema.virtual('daysAgo').get(function (this: IPostDocument) {
    const daysAgo = Math.floor((Date.now() - new Date(this.createdAt).getTime()) / 86400000); // 86400000 ms = 1 day

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

export default mongoose.models.Post || mongoose.model<IPostDocument>('Post', PostSchema);
