import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, Inject } from "fastify-decorators";

import {
  GET_RECENT_ACTIVITY_BY_USER,
  GET_LAST_24_HOURS_ACTIVITY,
  ACTIVITY_BASE_ENDPOINT,
} from "../constants/activity.constant";

import { AuthController } from "../common/auth.controller";
import { ActivityService } from "../services/activity.service";
import { ERROR_CODES, RESPONSE_MESSAGE, STATUS_CODES } from "../common/constants";

// ✅ ✅ ✅ FIXED RELATIVE IMPORT (VERY IMPORTANT)
import {
  getRecentActivitySchema,
  getLast24HoursActivitySchema,
} from "../schema/v1/activity/activity.get";

@Controller({ route: ACTIVITY_BASE_ENDPOINT })
export default class ActivityController extends AuthController {
  @Inject(ActivityService)
  activityService!: ActivityService;

  // ✅ ✅ GET TOP 3–4 RECENT ACTIVITIES (DASHBOARD)
  @GET(GET_RECENT_ACTIVITY_BY_USER, { schema: getRecentActivitySchema })
  async getRecentActivities(
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { userId } = request.params;

      const data = await this.activityService.getRecentTopFour(userId);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getRecentActivities: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  // ✅ ✅ GET LAST 24 HOURS ACTIVITIES
  @GET(GET_LAST_24_HOURS_ACTIVITY, { schema: getLast24HoursActivitySchema })
  async getLast24HoursActivities(
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { userId } = request.params;

      const data = await this.activityService.getLast24Hours(userId);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getLast24HoursActivities: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
