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


}