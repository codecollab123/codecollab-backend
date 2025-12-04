import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getGeminiModel = () => geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// gemini.ts
