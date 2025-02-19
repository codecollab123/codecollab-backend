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
}