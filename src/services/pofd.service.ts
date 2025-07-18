import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service";
import { PofdDAO } from "../dao/pofd.dao";
import { IPofd, PofdModel } from "../models/pofd.entity";
import { GeminiPofdService } from "../common/services/geminiPofd.service";

@Service()
export class PofdService {
  @Inject(PofdDAO)
  private pofdDAO!: PofdDAO;

  async getOrGenerateTodayProblem(): Promise<IPofd> {
    const today = await this.pofdDAO.getTodayProblem();
    console.log("✅ Returning saved PoFD from DB");

    if (today) return today;
  
    const geminiService = new GeminiPofdService(); // <-- ✅ instantiate
    const generated = await geminiService.generatePofd(); // <-- ✅ call method
    await this.deleteOldPofds(); // 👈 clean old ones
    return await this.pofdDAO.createProblem(generated);
  }
  async deleteOldPofds(): Promise<void> {
  const todayDate = new Date().toISOString().split("T")[0];
  await PofdModel.deleteMany({ date: { $ne: todayDate } });
}
}

