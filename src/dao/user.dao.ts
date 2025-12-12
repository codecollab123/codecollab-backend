import { Service } from "fastify-decorators";
import { Model } from "mongoose";
import { BaseDAO } from "../common/base.dao.js";
import { IUser, UserModel } from "../models/user.entity.js";

@Service()
export class UserDAO extends BaseDAO {
  model: Model<IUser>;

  constructor() {
    super();
    this.model = UserModel;
  }

  async getUserByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findUserById(id: string) {
    return this.model.findById(id);
  };

  async getUserByUserName(userName: string) {
    try {
      return await this.model.find({ userName });
    } catch (error: any) {
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  }

 async updateUser(userId: string, updates: Partial<IUser>) {
  console.log("Updating user with ID:", userId);
  const existing = await this.model.findById(userId);
  if (!existing) {
    console.log("User not found in DB");
  }
  return this.model.findByIdAndUpdate(userId, updates, { new: true });
}


  async createUser(userData: createUser) {
    try {
      const createdUser = await this.model.create(userData);
      return createdUser;
    } catch (error: any) {
      throw new Error(`Failed to add user: ${error.message}`);
    }
  }
}
