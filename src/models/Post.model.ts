import mongoose, { Schema } from 'mongoose';

import { IPost } from '@src/interfaces';
import { POST_CATEGORY } from '@src/constants';

export interface IPostDocument extends IPost {
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}

export const PostSchema: Schema<IPostDocument> = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide title'],
      maxLength: 100,
      minlength: 3
    },
    content: {
      type: String,
      trim: true,
      minlength: 5,
      required: [true, 'Please provide post description']
    },
    postImage: { type: String, required: true },
    cloudinary_id: {
      type: String
    },
    author: {
      // every post shuold blong to user
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // add relationship
      required: [true, 'author is required']
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
          POST_CATEGORY.BLOCKCHAIN
        ],
        message: `Please select category only from short listed option  
         ${POST_CATEGORY.TYPESCRIPT},
        ${POST_CATEGORY.SPORTS},
          ${POST_CATEGORY.REACTJS},
          ${POST_CATEGORY.NODEJS},
          ${POST_CATEGORY.NEXTJS},
          ${POST_CATEGORY.DEVAPP},
          ${POST_CATEGORY.CODING},
          ${POST_CATEGORY.BLOCKCHAIN},
           ${POST_CATEGORY.SOCIAL},
          )`
      },
      default: POST_CATEGORY.SOCIAL,
      trim: true,
      lowercase: true,
      required: true
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // add relationship
          required: [true, 'User is required']
        }
      }
    ],
    comments: [
      {
        comment: {
          type: String,
          required: true
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // add relationship
          required: [true, 'User is required']
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.models.Post || mongoose.model<IPostDocument>('Post', PostSchema);
