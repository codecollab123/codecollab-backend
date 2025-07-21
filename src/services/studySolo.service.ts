import {Service, Inject} from 'fastify-decorators';
import { BaseService } from '../common/base.service';
import { studySoloDao } from '../dao/studySolo.dao';

@Service()
export class StudySoloService extends BaseService {
  @Inject(studySoloDao)
  private studySoloDao!: studySoloDao;
  async create(body: any) {
    try {
      this.logger.info(`StudySoloService: create -> create Study Solo: ${body}`);

      const data = await this.studySoloDao.createStudySolo(body);

      return data;
    } catch (error: any) {
      this.logger.error(`Error in creating StudySolo: ${error.message}`);
    }
  }

  async update(userId: string, body: any) {
    this.logger.info(`StudySoloService: create -> create Study Solo: ${body}`);

    const data = await this.studySoloDao.updateStudySolo(userId, body);

    return data;
  }
async getAll() {
    this.logger.info(`StudySoloService: getAll`);
    const data = await this.studySoloDao.getAllStudySolos();
    return data;
}

  async get(query: any) {
    this.logger.info(`StudySoloService: get -> ${JSON.stringify(query)}`);
    const data = await this.studySoloDao.getStudySolo(query);
    return data;
  }

  async getByUserId(userId: string) {
    this.logger.info(`StudySoloService: getByUserId -> ${userId}`);
    const data = await this.studySoloDao.getStudySoloByUserId(userId);
    return data;
  }

  async delete(id: string) {
    this.logger.info(`StudySoloService: delete -> ${id}`);
    const data = await this.studySoloDao.deleteStudySolo(id);
    return data;
  }

  async getStudyStreakByUserId(userId: string): Promise<
  { date: string; blocks: number; isStreakDay: boolean }[]
> {
  this.logger.info(`StudySoloService: getStudyStreakByUserId -> ${userId}`);

  const records = await this.studySoloDao.getStudySoloByUserId(userId);

  const streakMap: Record<string, number> = {};

  for (const session of records) {
    const createdAt = new Date(session.createdAt!);
    const dateStr = createdAt.toISOString().split("T")[0];
    const duration = session.duration ?? 50;

    if (!streakMap[dateStr]) {
      streakMap[dateStr] = 0;
    }

    streakMap[dateStr] += duration;
  }

  const streakArray = Object.entries(streakMap).map(([date, totalDuration]) => {
    const blocks = Math.floor(totalDuration / 50);
    return {
      date,
      blocks, // ✅ how many 50min blocks that day
      isStreakDay: blocks > 0,
    };
  });

  return streakArray;
}
}