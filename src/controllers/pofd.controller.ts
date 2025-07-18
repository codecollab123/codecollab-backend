import { Controller, GET, Inject } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { PODF_ENDPOINT, GET_TODAYS_PODF } from "../constants/pofd.constant";
import { PofdService } from "../services/pofd.service";

@Controller({ route: PODF_ENDPOINT })
export default class PofdController {
  @Inject(PofdService)
  private service!: PofdService;

  @GET(GET_TODAYS_PODF)
  async fetchTodayProblem(_: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.service.getOrGenerateTodayProblem();
      reply.send({ data });
    } catch (err) {
      reply.status(500).send({ error: "Failed to fetch problem" });
    }
  }
}
