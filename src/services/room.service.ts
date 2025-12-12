import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service.js";
import { ConflictError, NotFoundError } from "../common/errors.js";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants.js";
import { IUser } from "../models/user.entity.js";
import { RoomDAO } from "../dao/room.dao.js";

@Service()
export class RoomService extends BaseService {
  @Inject(RoomDAO)
  private RoomDAO!: RoomDAO;

  /**
   * Service method to register a new USER
   * @param body
   * @param em
   * @returns
   */
  

}
