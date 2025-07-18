import axios from "axios";
import { IPofd, PofdModel } from "../../models/pofd.entity"; // Make sure path is correct
import { config } from "dotenv";

config();

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY_PRO;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY_PRO not set in .env");
}

export class GeminiPofdService {
  async generatePofd(): Promise<IPofd> {
      const todayDate = new Date().toISOString().split("T")[0]; 
     const existing = await PofdModel.findOne({ date: todayDate });
  if (existing) {
    console.log("✅ Found existing PoFD for today");
    return existing;
  }
    const pofdPrompt = `Generate one DSA problem and the problems which is for engineering students in the following format no too big  :

Question: <your question text>
Options:
A. <Option A>
B. <Option B>
C. <Option C>
D. <Option D>
Answer: <Correct option letter>
Explanation: <Short explanation in 1-2 lines>
Difficulty: <easy/medium/hard>
Topic: <e.g., Stack, Queue, Graph, etc.>

Give only the question in this format with no extra text or explanation outside it.`;

    try {
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: pofdPrompt }],
            },
          ],
        }
      );
      
      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty response from Gemini");

console.log("🎯 Gemini Output:", text.trim());  
      const parsed = this.parseResponse(text.trim());

      const todayDate = new Date().toISOString().split("T")[0]; // e.g., "2025-07-18"
      const newPofd = new PofdModel({ ...parsed, date: todayDate });

      await newPofd.save();
        console.log("new problem is generted")
      return newPofd;
    
    } catch (error: any) {
      console.error("PoFD Error:", error?.response?.data || error.message);
      throw new Error("Gemini PoFD API failed");
    }
  }

 private parseResponse(response: string): Partial<IPofd> {
  const lines = response.split("\n").filter(Boolean);
  const map: Partial<IPofd> = {};

  for (const line of lines) {
    if (line.startsWith("Question:")) {
      map.title = line.replace("Question:", "").trim();
    } else if (line.startsWith("Options:")) {
      // skip, handled in next lines
    } else if (line.match(/^[A-D]\./)) {
      map.description = (map.description || "") + line + "\n";
    } else if (line.startsWith("Answer:")) {
      map.answer = line.replace("Answer:", "").trim();
    
    } else if (line.startsWith("Difficulty:")) {
      const diff = line.replace("Difficulty:", "").trim().toLowerCase();
      if (["easy", "medium", "hard"].includes(diff)) {
        map.difficulty = diff as "easy" | "medium" | "hard";
      }
    } else if (line.startsWith("Topic:")) {
      map.source = line.replace("Topic:", "").trim(); // reuse 'source' field to hold topic
    }
  }

  return map;
}

}
