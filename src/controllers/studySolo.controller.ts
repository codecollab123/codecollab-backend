import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, Inject, POST, DELETE, PUT } from "fastify-decorators";
import { STUDY_SOLO_ENDPOINT, STUDY_SOLO_UPDATE_ENDPOINT } from "../constants/studysolo.constant";
import { AuthController } from "../common/auth.controller";
import { StudySoloService } from "../services/studySolo.service";
import { ERROR_CODES, RESPONSE_MESSAGE, STATUS_CODES } from "../common/constants";
import { createStudySoloSchema } from "../schema/v1/studySolo/studySolo.create";


@Controller({route: STUDY_SOLO_ENDPOINT})
export default class StudySoloController extends AuthController {
  @Inject(StudySoloService)
  studySoloService!: StudySoloService;

  @POST("", {schema: createStudySoloSchema })
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

  @PUT(STUDY_SOLO_UPDATE_ENDPOINT, {schema: createStudySoloSchema })
  async updateStudySolo(
    request: FastifyRequest<{
      Body: any,
      Params: "userId"
    }>,
    reply: FastifyReply,
  ) {
    try {
      this.logger.info(`StudySoloController -> createStudySolo -> Creating study solo`);

      const data = await this.studySoloService.update(request.params, request.body);

      reply.status(STATUS_CODES.SUCCESS).send({data});
    } catch (error: any) {
      this.logger.error(`Error in createStudySolo: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      })
    }
  }
}