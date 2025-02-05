import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { ConflictError, NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { IUser } from "../models/user.entity";
import { RoomDAO } from "../dao/room.dao";

@Service()
export class RoomService extends BaseService {
  @Inject(RoomDAO)
  private RoomDAO!: RoomDAO;

  /**
   * Service method to register a new FREELANCER
   * @param body
   * @param em
   * @returns
   */
  

}
