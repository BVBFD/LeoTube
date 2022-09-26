import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    mainCommentId: {
      type: String || null,
      required: false,
      default: null,
    },
    subCommentId: {
      type: Array<String>,
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<CommentImpl>('comments', CommentSchema);
