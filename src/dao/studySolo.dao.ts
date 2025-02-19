import { Model } from "mongoose";
import { Service } from "fastify-decorators";
import { BaseDAO } from "../common/base.dao";
import StudySoloModel, { IStudySolo } from "../models/studysolo.entity";

@Service()
export class studySoloDao extends BaseDAO {
  model: Model<IStudySolo>;

  constructor() {
    super();
    this.model = StudySoloModel;
  }

  async createStudySolo(data: IStudySolo) {
    try {
      const studySolo = await this.model.create(data);
      return studySolo;
    } catch (error: any) {
      throw new Error(`Failed to create study solo: ${error.message}`);
    }
  }

  async updateStudySolo(userId: string, data: any) {
    try {
      const updataStudySolo = await this.model.updateOne(
        { userId: userId },
        { $set: data }
      );

      return updataStudySolo;
    } catch (error: any) {
      throw new Error(`Failed to update study solo: ${error.message}`);
    }
  }
}
