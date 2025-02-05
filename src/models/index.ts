import { Model } from "mongoose";
import { IUser, UserModel } from "./user.entity";
import { IRoom, RoomModel } from "./room.entity";

export interface DBModels {
  UserModel?: Model<IUser>;
  RoomModel?: Model<IRoom>;
}

const models: DBModels = {
  UserModel,
  RoomModel,
};

export default models;
