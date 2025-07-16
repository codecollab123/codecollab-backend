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

  // ✅ Create
  async createStudySolo(data: IStudySolo) {
    try {
      return await this.model.create(data);
    } catch (error: any) {
      throw new Error(`Failed to create study solo: ${error.message}`);
    }
  }

  // ✅ Update
  async updateStudySolo(userId: string, data: any) {
    try {
      return await this.model.updateOne({ userId }, { $set: data });
    } catch (error: any) {
      throw new Error(`Failed to update study solo: ${error.message}`);
    }
  }

  // ✅ Get all records
  async getAllStudySolos() {
    try {
      return await this.model.find();
    } catch (error: any) {
      throw new Error(`Failed to fetch all study solos: ${error.message}`);
    }
  }

  // ✅ Get by query (dynamic filter)
  async getStudySolo(query: any) {
    try {
      return await this.model.findOne(query); // can use find() if expecting multiple
    } catch (error: any) {
      throw new Error(`Failed to fetch study solo: ${error.message}`);
    }
  }

  // ✅ Get by userId
  async getStudySoloByUserId(userId: string) {
    try {
      return await this.model.find({ userId });
    } catch (error: any) {
      throw new Error(`Failed to fetch study solos by userId: ${error.message}`);
    }
  }

  // ✅ Delete by ID
  async deleteStudySolo(id: string) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error: any) {
      throw new Error(`Failed to delete study solo: ${error.message}`);
    }
  }
}
