import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao.js";
import { IRoom, RoomModel } from "../models/room.entity.js";

@Service()
export class RoomDAO extends BaseDAO {
  model: Model<IRoom>;

  constructor() {
    super();
    this.model = RoomModel;
  }

  async createRoom(data: any) {
    try {
      const createdRoom = await this.model.create(data);
      return createdRoom;
    } catch (error: any) {
      throw new Error(`Failed to create room: ${error.message}`);
    }
  }
}
