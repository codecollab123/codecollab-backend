import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createStudySoloSchema: FastifySchema = {
  // description: "API to create a StudySolo",
  tags: ["StudySolo"],
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      background: { type: "string" },
      music: { type: "string" },
      video: { type: "string" },
      quote: { type: "string" },
      todolist: { type: "string" },
      duration: { type: "number", minimum: 0 },
    },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            background: { type: "string" },
            music: { type: "string" },
            video: { type: "string" },
            quote: { type: "string" },
            todolist: { type: "string" },
            duration: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
