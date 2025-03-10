import { Service, Inject } from "fastify-decorators";

import { BaseService } from "../common/base.service";


import { UserDAO } from "../dao/user.dao";

@Service()
export class PublicService extends BaseService {
  @Inject(UserDAO)
  private userDAO!: UserDAO;

  async getUserByEmail(email: string) {
    try {
      const user = await this.userDAO.getUserByEmail(email);
      if (user) {
        return {
          _id: user._id,
          userName: user.userName,
          email: user.email,
          profilePic: user?.profilePic,
          phone: user?.phone,
        };
      };
      return;
    } catch (error: any) {
      this.logger.error("Error finding user by email:", error);
      throw new Error("Internal server error");
    }
  };

  async getUserByUserName(userName: string) {
    this.logger.info(
      `PublicService: getUserByUserName: Fetching User for User Name: ${userName}`,
    );

    const userAvialable = await this.userDAO.getUserByUserName(userName);

    return userAvialable;
  };

}
