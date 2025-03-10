import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, GET, Inject } from "fastify-decorators";
import {
  ERROR_CODES,
  RESPONSE_MESSAGE,
  STATUS_CODES,
} from "../common/constants";

import {
  PUBLIC_END_POINT,
  GET_USER_BY_EMAIL,
  GET_USER_BY_USERNAME,
} from "../constants/public.constant";
import { BaseController } from "../common/base.controller";

import { PublicService } from "../services/public.service";
import { UserService } from "../services/user.service";
import { getUserByEmail, getUserByUserName } from "../schema/v1/public/public.get";
import { getUserEmailQuery, getUserNameQuery } from "../types/v1/public/public.get";

@Controller({ route: PUBLIC_END_POINT })
export default class PublicController extends BaseController {

  @Inject(UserService)
  userService!: UserService;

  @Inject(PublicService)
  PublicService!: PublicService;

  @GET(GET_USER_BY_EMAIL, { schema: getUserByEmail })
  async getUserByEmail(
    request: FastifyRequest<{ Querystring: getUserEmailQuery }>,
    reply: FastifyReply,
  ) {
    try {
      const { user } = request.query;

      if (!user) {
        throw new Error("user_email is required");
      }

      this.logger.info(
        `PublicController -> getUserByEmail -> Fetching data for users: ${user}`,
      );

      const data = await this.PublicService.getUserByEmail(user);

      if (!data) {
        return reply
          .code(404)
          .send({ message: "No user found for this user email" });
      }

      reply.status(STATUS_CODES.SUCCESS).send(data);
    } catch (error: any) {
      this.logger.error(`Error in getUserByEmail: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("Data not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.DATA_NOT_FOUND,
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }

  @GET(GET_USER_BY_USERNAME, { schema: getUserByUserName })
  async getUserByUserName(
    request: FastifyRequest<{ Querystring: getUserNameQuery }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `PublicController -> getUserByUserName -> Fetching User`,
      );
      let { username } = request.query;

      const data = await this.PublicService.getUserByUserName(username);
      if (!data || data.length === 0) {
        return reply
          .code(404)
          .send({ message: "No user found for this user name" });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in get user by user name: ${error.message}`);
      if (
        error.ERROR_CODES === "NOT_FOUND" ||
        error.message.includes("User not found")
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("User"),
          code: ERROR_CODES.NOT_FOUND,
        });
      } else {
        reply.status(STATUS_CODES.SERVER_ERROR).send({
          message: RESPONSE_MESSAGE.SERVER_ERROR,
          code: ERROR_CODES.SERVER_ERROR,
        });
      }
    }
  }
}
