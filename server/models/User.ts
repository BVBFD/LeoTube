import mongoose from 'mongoose';

interface UserImpl extends DocumentResult<UserImpl> {
  name: string;
  email: string;
  password: string;
  img?: string;
  subscribers?: number;
  subscribedUsers?: string[];
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserImpl>('User', UserSchema);
