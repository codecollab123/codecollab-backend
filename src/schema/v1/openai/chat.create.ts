import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const chatWithGeminiSchema: FastifySchema = {
  description: "API to interact with Gemini AI for chatbot responses",
  summary: "API to chat with Gemini AI",
  tags: ["Gemini"],
  body: {
    type: "object",
    properties: {
      message: { type: "string", description: "User input message to the chatbot" },
    },
    required: ["message"],
  },
  response: {
    200: {
      description: "Successful response from Gemini AI",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            reply: { type: "string", description: "AI-generated response" },
            tokensUsed: { type: "number", description: "Number of tokens used in this request" },
          },
          required: ["reply"],
        },
      },
    },
    ...commonErrorResponses,
  },
};
