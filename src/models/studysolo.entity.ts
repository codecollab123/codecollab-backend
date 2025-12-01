import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IStudySolo extends Document {
  _id: string;
  userId: string;
  background: string;
  music: string;
  video?: string;
  quote?: string;
  todolist?: string;
  duration?: number;
  streakCount?: number;        
  lastStudiedDate?: Date;     
  
  createdAt?: Date;
  updatedAt?: Date;
}

const StudySoloSchema: Schema<IStudySolo> = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  background: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  quote: {
    type: String,
  },
  todolist: {
    type: String,
  },
  duration: {
  type: Number,
  default: 0, // or 50 if default sessions are always 50min
},
  streakCount: {
    type: Number,
    default: 0, // Initialize streak count to 0
  },
  lastStudiedDate: {
    type: Date,
    default: null, // Initialize to null, will be set when user studies
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
const StudySoloModel: Model<IStudySolo> = mongoose.model(
  "StudySolo",
  StudySoloSchema
);
export default StudySoloModel;