import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, Inject, POST, DELETE, PUT } from "fastify-decorators";
import {
  STUDY_SOLO_ENDPOINT,
  STUDY_SOLO_UPDATE_ENDPOINT,
  STUDY_SOLO_GET_ALL_ENDPOINT,
  STUDY_SOLO_GET_ENDPOINT,
  STUDY_SOLO_GET_BY_USER_ID_ENDPOINT,
  STUDY_SOLO_DELETE_ENDPOINT,
  STUDY_SOLO_CREATE_ENDPOINT,
  STUDY_SOLO_GET_STREAK_BY_USER_ID_ENDPOINT
} from "../constants/studysolo.constant";
import { AuthController } from "../common/auth.controller";
import { StudySoloService } from "../services/studySolo.service";
import { ERROR_CODES, RESPONSE_MESSAGE, STATUS_CODES } from "../common/constants";
import { createStudySoloSchema } from "../schema/v1/studySolo/studySolo.create";
import { updateStudySoloSchema } from "../schema/v1/studySolo/studySolo.update";
import { getAllStudySoloSchema, getStudySoloByUserIdSchema, getStudySoloSchema } from "../schema/v1/studySolo/studySolo.get";
import { deleteStudySoloSchema } from "../schema/v1/studySolo/studySolo.delete";
import { getStudyStreakByUserIdSchema } from "../schema/v1/studySolo/studySolo.get";



@Controller({route: STUDY_SOLO_ENDPOINT})
export default class StudySoloController extends AuthController {
  @Inject(StudySoloService)
  studySoloService!: StudySoloService;

  @POST(STUDY_SOLO_CREATE_ENDPOINT, {schema: createStudySoloSchema })
  async createStudySolo(
    request: FastifyRequest<{Body: any}>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info(`StudySoloController -> createStudySolo -> Creating study solo`);

      const data = await this.studySoloService.create(request.body);

      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in createStudySolo: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      })
    }
  };
@PUT(STUDY_SOLO_UPDATE_ENDPOINT, { schema: updateStudySoloSchema })
async updateStudySolo(
  request: FastifyRequest<{
    Body: any;
    Params: { userId: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { userId } = request.params;
    const data = await this.studySoloService.update(userId, request.body);

    reply.status(STATUS_CODES.SUCCESS).send({ data });
  } catch (error: any) {
    this.logger.error(`Error in updateStudySolo: ${error.message}`);
    reply.status(STATUS_CODES.SERVER_ERROR).send({
      message: RESPONSE_MESSAGE.SERVER_ERROR,
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
}

  
  
  // ✅ Get all StudySolo records
  @GET(STUDY_SOLO_GET_ALL_ENDPOINT, {schema: getAllStudySoloSchema })
  async getAllStudySolos(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const data = await this.studySoloService.getAll();
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error fetching all StudySolos: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR
      });
    }
  }

  // ✅ Get a specific StudySolo record (by query or ID)
  @GET(STUDY_SOLO_GET_ENDPOINT, {schema:getStudySoloSchema})
  async getStudySolo(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const data = await this.studySoloService.get(request.query);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error fetching StudySolo: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR
      });
    }
  }

  // ✅ Get all StudySolo records for a specific user
  @GET(STUDY_SOLO_GET_BY_USER_ID_ENDPOINT, {schema:getStudySoloByUserIdSchema})
  async getStudySoloByUserId(
    request: FastifyRequest<{ Querystring: { userId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { userId } = request.query;
      const data = await this.studySoloService.getByUserId(userId);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error fetching StudySolo by userId: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR
      });
    }
  }

  // ✅ Delete a StudySolo record
  @DELETE(STUDY_SOLO_DELETE_ENDPOINT, {schema:deleteStudySoloSchema})
  async deleteStudySolo(
    request: FastifyRequest<{ Querystring: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.query;
      const result = await this.studySoloService.delete(id);
      reply.status(STATUS_CODES.SUCCESS).send({ result });
    } catch (error: any) {
      this.logger.error(`Error deleting StudySolo: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR
      });
    }
  }

  @GET(STUDY_SOLO_GET_STREAK_BY_USER_ID_ENDPOINT, { schema: getStudyStreakByUserIdSchema })
async getStudyStreakByUserId(
  request: FastifyRequest<{ Params: { user_id: string } }>,
  reply: FastifyReply
) {
  try {
    const { user_id } = request.params;
    const data = await this.studySoloService.getStudyStreakByUserId(user_id);
    reply.status(STATUS_CODES.SUCCESS).send({ data });
  } catch (error: any) {
    this.logger.error(`Error in getStudyStreakByUserId: ${error.message}`);
    reply.status(STATUS_CODES.SERVER_ERROR).send({
      message: RESPONSE_MESSAGE.SERVER_ERROR,
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
}

}

