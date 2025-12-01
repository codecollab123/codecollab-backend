import { Service } from "fastify-decorators";
import axios from "axios";

@Service()
export class CodeService {
  private languageMap: Record<string, number> = {
    c: 50,
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63,
    go: 60,
    rust: 73,
  };

  async executeCode(code: string, language: string, input: string = "") {
    const langId = this.languageMap[language];

    if (!langId) throw new Error("Unsupported language");

    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: langId,
          stdin: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const data = res.data;

      return {
        output: data.stdout || data.stderr || data.compile_output || "No output",
        status: data.status?.description,
        time: data.time,
        memory: data.memory,
      };

    } catch (err: any) {
      console.error("Judge0 Error:", err.response?.data || err.message);
      throw new Error("Failed to execute code");
    }
  }
}
