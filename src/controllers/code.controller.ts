import { Controller, POST, Inject } from "fastify-decorators";
import { FastifyRequest, FastifyReply } from "fastify";
import { CODE_ENDPOINT, RUN_CODE_ENDPOINT } from "../constants/code.constant";
import { CodeService } from "../services/code.service";

console.log("📂 CodeController file imported");

@Controller({ route: CODE_ENDPOINT })
export default class CodeController {

  @Inject(CodeService)
  codeService!: CodeService;

  constructor() {
    console.log("🟢 CodeController Registered Successfully (Fastify Loaded It)");
  }

  @POST(RUN_CODE_ENDPOINT)
  async runCode(req: FastifyRequest, reply: FastifyReply) {
    console.log("🚀 Incoming /code/run request");
    console.log("📥 Request Body:", req.body);

    try {
      const { code, language } = req.body as any;

      if (!code || !language) {
        console.log("❌ Missing code or language");
        return reply.status(400).send({
          message: "Code and language are required",
        });
      }

      console.log(`⚙️ Executing code in language: ${language}`);

      const result = await this.codeService.executeCode(code, language);

      console.log("✅ Execution result:", result);

      return reply.status(200).send({ result });
    } catch (error: any) {
      console.error("🔥 CodeController Error:", error);
      return reply.status(500).send({
        message: "Code execution failed",
        error: error.message,
      });
    }
  }
}
