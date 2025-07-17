import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IComment extends Document {
  _id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  _id: {
    type: String,
    default: uuidv4,
  },
  postId: {
    type: String,
    ref: "Post",
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = model<IComment>("Comment", CommentSchema);
export default CommentModel;
