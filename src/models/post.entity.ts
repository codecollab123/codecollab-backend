import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPost extends Document {
  _id: string;
  caption: string;
  image: string;
  author: string;
  likes: string[];
  comments: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema: Schema<IPost> = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  caption: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: String,
      ref: "User",
    },
  ],
  comments: [
    {
      type: String,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel: Model<IPost> = mongoose.model("Post", PostSchema);
export default PostModel;
