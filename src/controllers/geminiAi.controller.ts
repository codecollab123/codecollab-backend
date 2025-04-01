import { FastifyRequest, FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { AuthController } from "../common/auth.controller";
import { STATUS_CODES, RESPONSE_MESSAGE, ERROR_CODES } from "../common/constants";
import { GEMINI_AI_END_POINT, CHAT_WITH_GEMINI } from "../constants/gemini.constant";
import { GenerateChatBody } from "../types/v1/openai/generateAi";
import { GeminiAiService } from "../common/services/geminiAi.service";

@Controller({ route: GEMINI_AI_END_POINT })  
export default class GeminiController extends AuthController {
  
  private geminiAiService = new GeminiAiService(); // Instantiate service once

  @POST(CHAT_WITH_GEMINI)
  async chatWithAI(
    request: FastifyRequest<{ Body: GenerateChatBody }>,
    reply: FastifyReply
  ) {
    try {
      this.logger.info("Chat request received...");
      console.log("User Message:", request.body.message);

      // Call the Gemini AI service to get a response
      const { reply: aiReply, tokensUsed } = await this.geminiAiService.chatWithGemini(request.body.message);

      // Send response to client
      reply.status(STATUS_CODES.SUCCESS).send({
        data: {
          reply: aiReply,
          tokensUsed,
        },
      });

    } catch (error: any) {
      this.logger.error(`Error in chatbot response: ${error.message}`);

      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }
}
