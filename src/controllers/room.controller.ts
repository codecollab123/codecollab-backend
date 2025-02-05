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
import { RoomService } from "../services/room.service";
import { ROOM_ENDPOINT } from "../constants/room.constant";

@Controller({ route: ROOM_ENDPOINT })
export default class RoomController extends BaseController {
  @Inject(RoomService)
  roomService!: RoomService;

  
}
