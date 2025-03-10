import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createUserSchema: FastifySchema = {
  description: "API to create a User",
  tags: ["Register"],
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      userName: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
      dob: { type: "string", format: "date-time" },
      profilePic: { type: "string" },
    },
    required: [
      "firstName",
      "lastName",
      "userName",
      "email",
    ],
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
            email: { type: "string" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

