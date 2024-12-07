import mongoose, { Types } from 'mongoose';

export interface CommentI extends mongoose.Document {
  comment: string;
  user: mongoose.Types.ObjectId;
}

export interface IShare {
  user: mongoose.Types.ObjectId;
}

export interface LikeT {
  user: mongoose.Types.ObjectId;
}

export interface DisLikeT {
  user: mongoose.Types.ObjectId;
}

export interface ShareT {
  user: mongoose.Types.ObjectId;
}

export interface ViewsT {
  user: mongoose.Types.ObjectId;
}

export interface AddCommentT extends CommentI {
  postId: Types.ObjectId;
}

export interface UpdateCommentT extends AddCommentT {
  commentId: Types.ObjectId;
}

export interface IPost extends mongoose.Document {
  title: string;
  description: string;
  photoUrl: string;
  author: mongoose.Types.ObjectId;
  comments: CommentI[];
  likes: LikeT[];
  disLikes: DisLikeT[];
  views: ViewsT[];
  shares: ShareT[];
  category?: string;
  cloudinary_id?: string;
  timestamps?: boolean;
  _id: Types.ObjectId;
}
