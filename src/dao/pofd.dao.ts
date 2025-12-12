import { Model } from "mongoose";
import { Service } from "fastify-decorators";
import { IPofd, PofdModel } from "../models/pofd.entity";
import dayjs from "dayjs";

@Service()
export class PofdDAO {
  model: Model<IPofd> = PofdModel;  

  async getTodayProblem(): Promise<IPofd | null> {
    const todayDate = dayjs().format("YYYY-MM-DD");
    return this.model.findOne({ date: todayDate });
  }

  async createProblem(data: Partial<IPofd>): Promise<IPofd> {
    return this.model.create(data);
  }
}
