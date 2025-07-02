/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, Inject, PUT,GET } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants";
import { BaseController } from "../common/base.controller";
import {
  UPDATE_USER_PROFILE,
  USER_ENDPOINT,
  USER_ID_DETAILS_ENDPOINT,
} from "../constants/user.constant";
import { UserService } from "../services/user.service";
import { updateUserSchema } from "../schema/v1/user/user.update";
import { IUser } from "../models/user.entity";
import { getUserDetails } from "../schema/v1/user/user.get";
import { GetUserPathParams } from "../types/v1/user/getUser";

@Controller({ route: USER_ENDPOINT })
export default class UserController extends BaseController {
  @Inject(UserService)
  userService!: UserService;

  @PUT(UPDATE_USER_PROFILE, { schema: updateUserSchema })
  async updateUser(
    request: FastifyRequest<{
      Params: { id: string };
      Body: any;
    }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `UserController -> updateUser -> Updating user with ID ${request.params.id}`
      );

      const updatedUser = await this.userService.updateUserProfile(
        request.params.id,
        request.body as Partial<IUser> // ✅ fixed here
      );

      if (!updatedUser) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
          code: ERROR_CODES.NOT_FOUND,
        });
      }

      reply.status(STATUS_CODES.SUCCESS).send({ data: updatedUser });
    } catch (error: any) {
      this.logger.error("Error updating user profile", error.message);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
  @GET(USER_ID_DETAILS_ENDPOINT, { schema: getUserDetails })
  async getUserDetails(
    request: FastifyRequest<{ Params: GetUserPathParams }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(
        `FreelancerController -> getFreelancerDetails -> Fetching freelancer details for ID: ${request.params.User_id}`
      );

      const data = await this.userService.getUserProfile(
        request.params.User_id
      );

     
      reply.status(STATUS_CODES.SUCCESS).send(data);
    } catch (error: any) {
      this.logger.error(`Error in getFreelancer: ${error.message}`);
      if (
        error.ERROR_CODES === "FREELANCER_NOT_FOUND" ||
        error.message.includes(
          "Freelancer with provided ID could not be found."
        )
      ) {
        reply.status(STATUS_CODES.NOT_FOUND).send({
          message: RESPONSE_MESSAGE.NOT_FOUND("Freelancer"),
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
