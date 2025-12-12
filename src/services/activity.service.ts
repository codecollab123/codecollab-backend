import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service.js";
import { ActivityDAO } from "../dao/activity.dao.js";

@Service()
export class ActivityService extends BaseService {
  @Inject(ActivityDAO)
  private activityDAO!: ActivityDAO;

  // ✅ INTERNAL USE: LOG ACTIVITY (Post/Room/Notes yahan se call karenge)
  async logActivity(userId: string, action: string, meta: any = {}) {
    try {
      if (!userId) throw new Error("User ID is required");
      if (!action) throw new Error("Action is required");

      this.logger.info(`ActivityService: logActivity -> ${action}`);

      return await this.activityDAO.createActivity({
        userId,
        action,
        meta,
      });
    } catch (error: any) {
      this.logger.error(`Error in logActivity: ${error.message}`);
      throw error;
    }
  }

  // ✅ DASHBOARD: GET TOP 3–4 RECENT ACTIVITIES
  async getRecentTopFour(userId: string) {
    try {
      if (!userId) throw new Error("User ID is required");

      return await this.activityDAO.getTopFourRecentByUser(userId);
    } catch (error: any) {
      this.logger.error(`Error in getRecentTopFour: ${error.message}`);
      throw error;
    }
  }

  // ✅ GET LAST 24 HOURS ACTIVITIES
  async getLast24Hours(userId: string) {
    try {
      if (!userId) throw new Error("User ID is required");

      return await this.activityDAO.getLast24HoursByUser(userId);
    } catch (error: any) {
      this.logger.error(`Error in getLast24Hours: ${error.message}`);
      throw error;
    }
  }
}
