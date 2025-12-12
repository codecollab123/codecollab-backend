import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes.js";

export const deleteStudySoloSchema: FastifySchema = {
  description: "API to delete a StudySolo by ID",
  tags: ["StudySolo"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    ...commonErrorResponses,
  },
};
