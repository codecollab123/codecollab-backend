/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, Inject, POST } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { BaseController } from "../common/base.controller";
import { REGISTRATION_ENDPOINT } from "../constants/register.constant";
import { UserService } from "../services/user.service";
import { USER_ENDPOINT } from "../constants/user.constant";
import { IUser } from "../models/user.entity";
import { createUserSchema } from "../schema/v1/user/user.create";

@Controller({ route: REGISTRATION_ENDPOINT })
export default class RegisterController extends BaseController {
  @Inject(UserService)
  userService!: UserService;

  @POST(USER_ENDPOINT, { schema: createUserSchema })
  async create(
    request: FastifyRequest<{
      Body: IUser;
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(
        `UserController -> create -> : Creating a new User`,
      );

      const data = await this.userService.createUserProfile(
        request.body,
      );
      this.logger.warn(data);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(
        "error in controller create user profile",
        error.message,
      );
      if (error.message === RESPONSE_MESSAGE.USER_EXISTS) {
        return reply.status(STATUS_CODES.BAD_REQUEST).send({
          message: RESPONSE_MESSAGE.USER_EXISTS,
          code: ERROR_CODES.BAD_REQUEST_ERROR,
        });
      }

      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
