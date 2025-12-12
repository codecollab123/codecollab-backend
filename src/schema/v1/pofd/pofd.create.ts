import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes.js";

export const createPofdSchema: FastifySchema = {
  description: "Create a new problem of the day",
  tags: ["Pofd"],
 body: {
  type: "object",
  required: ["title", "description", "difficulty", "source"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
    source: { type: "string" },
    answer: { type: "string" }, // <-- add this if needed
  },
},

  response: {
    200: {
      type: "object",
      properties: {
        data: { type: "object" },
      },
    },
  },
};