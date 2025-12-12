/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, Inject, POST } from "fastify-decorators";
import {
  STATUS_CODES,
  ERROR_CODES,
  RESPONSE_MESSAGE,
} from "../common/constants.js";
import { BaseController } from "../common/base.controller.js";
import { REGISTRATION_ENDPOINT } from "../constants/register.constant.js";
import { UserService } from "../services/user.service.js";
import { USER_ENDPOINT } from "../constants/user.constant.js";
import { IUser } from "../models/user.entity.js";
import { createUserSchema } from "../schema/v1/user/user.create.js";
import { RoomService } from "../services/room.service.js";
import { ROOM_ENDPOINT } from "../constants/room.constant.js";

@Controller({ route: ROOM_ENDPOINT })
export default class RoomController extends BaseController {
  @Inject(RoomService)
  roomService!: RoomService;

  
}
