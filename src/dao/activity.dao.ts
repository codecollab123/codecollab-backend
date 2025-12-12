import { Model } from "mongoose";
import { Service } from "fastify-decorators";
import { BaseDAO } from "../common/base.dao.js";
import ActivityModel from"../models/activity.entity.js";

@Service()
export class ActivityDAO extends BaseDAO {
  model: Model<any>;

  constructor() {
    super();
    this.model = ActivityModel;
  }

  // ✅ CREATE / LOG ACTIVITY (internal use only)
  async createActivity(data: {
    userId: string;
    action: string;
    meta?: any;
  }) {
    try {
      const activity = await this.model.create(data);
      return activity;
    } catch (error: any) {
      throw new Error(`Failed to create activity: ${error.message}`);
    }
  }

  // ✅ GET TOP 4 RECENT ACTIVITIES (for dashboard)
  async getTopFourRecentByUser(userId: string) {
    try {
      return await this.model
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(4);
    } catch (error: any) {
      throw new Error(
        `Failed to fetch recent activities: ${error.message}`
      );
    }
  }

  // ✅ GET LAST 24 HOURS ACTIVITIES
  async getLast24HoursByUser(userId: string) {
    try {
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

      return await this.model
        .find({
          userId,
          createdAt: { $gte: last24Hours },
        })
        .sort({ createdAt: -1 });
    } catch (error: any) {
      throw new Error(
        `Failed to fetch last 24 hours activities: ${error.message}`
      );
    }
  }
}
