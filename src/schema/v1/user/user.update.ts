import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const updateUserSchema: FastifySchema = {
  description: "API to update user profile",
  summary: "Update a user by ID",
  tags: ["User"],

  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },

  body: {
    type: "object",
    properties: {
      firstName: { type: "string", minLength: 1 },
      lastName: { type: "string", minLength: 1 },
      userName: { type: "string", minLength: 3 },
      email: { type: "string", format: "email" },
      phone: { type: "string", pattern: "^[0-9]{10}$" },
      dob: { type: "string", format: "date-time" },
      profilePic: { type: "string", format: "uri" },
    },
    required: [], 
    additionalProperties: false,
  },

  response: {
    200: {
      description: "User updated successfully",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            email: { type: "string", format: "email" },
            userName: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            phone: { type: "string" },
            dob: { type: "string", format: "date-time" },
            profilePic: { type: "string" },
          },
          additionalProperties: false,
        },
      },
    },
    ...commonErrorResponses,
  },
};
