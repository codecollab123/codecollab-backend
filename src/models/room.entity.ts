import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IRoom extends Document {
  _id: string;
  admin: Map<
  string,
  {
    _id?: string;
    userName?: string;
    sessionId?: string;
  }
>;
  friends: Map<
  string,
  {
    _id?: string;
    userName?: string;
    sessionId?: string;
  }
>;
};

const roomSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    admin: {
      type: Map,
      of: new Schema({
        _id: {
          type: String,
          default: uuidv4,
          require: true,
        },
        userName: {
          type: String,
          require: true,
        },
        sessionId: {
          type: String,
          required: true,
        },
      })
    },
    friend: {
      type: Map,
      of: new Schema({
        _id: {
          type: String,
          default: uuidv4,
          require: true,
        },
        userName: {
          type: String,
          require: true,
        },
        sessionId: {
          type: String,
          required: true,
        },
      })
    },
  },
  {
    timestamps: true,
  },
);

export const RoomModel: Model<IRoom> = mongoose.model<IRoom>(
  "Room",
  roomSchema,
);