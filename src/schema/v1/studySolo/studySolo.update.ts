import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const updateStudySoloSchema: FastifySchema = {
  description: "API to update a StudySolo",
  tags: ["StudySolo"],
  params: {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
  },
  body: {
    type: "object",
    properties: {
      background: { type: "string" },
      music: { type: "string" },
      video: { type: "string" },
      quote: { type: "string" },
      todolist: { type: "string" },
    },
    required: [], // All fields are optional for update
  },
  response: {
    200: {
      description: "StudySolo updated successfully",
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
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            __v: { type: "number" },
          },
          required: ["_id", "userId"],
        },
      },
    },
    ...commonErrorResponses,
  },
};
