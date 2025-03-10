import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const getUserByEmail: FastifySchema = {
  description: "API endpoint to retrieve a user by their email.",
  tags: ["Public"],
  summary: "Fetch user with their details using email.",
  querystring: {
    type: "object",
    properties: {
      user: {
        type: "string",
        format: "email",
        description: "Email of the user to be retrieved.",
      },
    },
    required: ["user"],
  },
  response: {
    200: {
      description: "Successful response with user details",
      type: "object",
      properties: {
        _id: { type: "string" },
        userName: { type: "string" },
        email: { type: "string" },
        profilePic: { type: "string", nullable: true },
        phone: { type: "string", nullable: true },
      },
    },
    400: {
      description: "Bad request due to invalid input.",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Invalid request format.",
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getUserByUserName: FastifySchema = {
  description: "API endpoint to retrieve a list of users by their user name.",
  tags: ["Public"],
  summary: "Fetch user with their details.",
  querystring: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "user name or company name of user.",
      },
    },
  },
  response: {
    400: {
      description: "Bad request due to invalid input.",
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Invalid request format.",
        },
      },
    },
    ...commonErrorResponses,
  },
};