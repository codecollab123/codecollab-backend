import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IActivity extends Document {
  _id: string;
  userId: string;
  action: string; // e.g. CREATED_POST, JOINED_ROOM, VIEWED_NOTES
  meta?: any;     // extra info: postId, roomId, title etc.
  createdAt?: Date;
  updatedAt?: Date;
}

const ActivitySchema: Schema<IActivity> = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },

  userId: {
    type: String,
    required: true,
    index: true,
  },

  action: {
    type: String,
    required: true,
  },

  meta: {
    type: Schema.Types.Mixed,
    default: {},
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ActivityModel: Model<IActivity> = mongoose.model(
  "Activity",
  ActivitySchema
);

export default ActivityModel;
