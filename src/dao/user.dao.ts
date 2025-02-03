import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao";
import { IUser, UserModel } from "../models/user.entity";

@Service()
export class UserDAO extends BaseDAO {
  model: Model<IUser>;

  constructor() {
    super();
    this.model = UserModel;
  }

  async createUser(userData: IUser) {
    try {
      const createdUser = await this.model.create(userData);
      return createdUser;
    } catch (error: any) {
      throw new Error(`Failed to add user: ${error.message}`);
    }
  }
}
