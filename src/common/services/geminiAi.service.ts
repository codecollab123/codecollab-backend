import axios from "axios";
import { config } from "dotenv";

config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

export class GeminiAiService {
  async chatWithGemini(message: string): Promise<{ reply: string; tokensUsed: number }> {
    try {
      const prompt = `You are an AI coding assistant inside a collaborative coding room where multiple developers work together. Your job is to help coders with debugging, code explanations, best practices, and syntax issues while keeping responses concise (4 lines max). If a coder is stuck, provide step-by-step guidance. If the question lacks context, ask for more details before responding.`;
      
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: `${prompt}\nUser: ${message}` }] }]
        }
      );
      
      const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond to that.";
      const tokensUsed = response.data?.usageMetadata?.totalTokenCount || 0;
      
      return { reply, tokensUsed };
    } catch (error) {
      console.error("Error communicating with Gemini AI:", error);
      throw new Error("Failed to get a response from Gemini AI");
    }
  }
}
