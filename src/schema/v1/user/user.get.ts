import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes.js";

export const getUserSchema: FastifySchema = {
  description: "API to get User profile data",
  tags: ["User"],
  querystring: {
    type: "object",
    properties: {
      filters: {
        type: "object",
        additionalProperties: true,
      },
      limit: {
        type: "string",
      },
      page: {
        type: "string",
      },
    },
    required: [],
  },
  response: {
    // TODO: Add 200 response schema
    ...commonErrorResponses,
  },
};

export const getUserDetails: FastifySchema = {
  description: "API to get User profile details",
  tags: ["User"],
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        userName: { type: "string" },
        profilePic: {
          type: "string",
        },
        dob:{type:"string"},
        description: { type: "string" },
        
      },
    },
    ...commonErrorResponses,
  },
};
