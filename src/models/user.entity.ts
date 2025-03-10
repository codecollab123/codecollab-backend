import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone?: string;
  dob?: Date;
  profilePic?: string;
};

const userSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
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
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema,
);