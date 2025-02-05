import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { ConflictError, NotFoundError } from "../common/errors";
import { ERROR_CODES, RESPONSE_MESSAGE } from "../common/constants";
import { UserDAO } from "../dao/user.dao";
import { IUser } from "../models/user.entity";
import { firebaseClient } from "../common/services";

@Service()
export class UserService extends BaseService {
  @Inject(UserDAO)
  private UserDAO!: UserDAO;

  /**
   * Service method to register a new FREELANCER
   * @param body
   * @param em
   * @returns
   */
  
  async createUserProfile(userData: createUser) {
    try {
      this.logger.info(
        "UserService: createUserProfile: Creating User: ",
        userData,
      );

      // Create Firebase user
      const user_id =
        await firebaseClient.createFireBaseUserWithCustomClaims(
          userData.email,
          userData.password,
          { type: "user" },
          userData.phone,
        );

      userData._id = user_id;
      // create new user
      const userObj = { ...userData, password: "" };
      const data: any = await this.UserDAO.createUser(userObj);
      if (data.description && data.description.length > 500) {
        throw new Error("Description cannot exceed 500 characters.");
      }

      return data;
    } catch (error: any) {
      if (userData._id) {
        try {
          await firebaseClient.deleteFireBaseUser(userData._id);
          this.logger.info(
            `Rolled back Firebase user creation for ID: ${userData._id}`,
          );
        } catch (rollbackError) {
          this.logger.error(
            `Error rolling back Firebase user creation: ${rollbackError}`,
          );
        }
      }
      if (error.code === "USER_ALREADY_EXISTS") {
        throw new ConflictError(
          RESPONSE_MESSAGE.USER_EXISTS,
          ERROR_CODES.USER_ALREADY_EXIST,
        );
      } else {
        this.logger.error("Error in createUser:", error);
        throw error; // Pass the error to the parent for proper handling
      }
    }
  }
}
