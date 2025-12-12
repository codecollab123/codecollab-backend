import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes.js";

export const getStudySoloSchema: FastifySchema = {
  description: "API to get a StudySolo by userId",
  tags: ["StudySolo"],
  querystring: {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
  },
  response: {
    200: {
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
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getAllStudySoloSchema: FastifySchema = {
  description: "API to get all StudySolo records",
  tags: ["StudySolo"],
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
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
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};


export const getStudySoloByUserIdSchema: FastifySchema = {
  description: "API to get study solo records by userId",
  tags: ["StudySolo"],
  querystring: {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
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
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getStudyStreakByUserIdSchema: FastifySchema = {
  description: "Fetch study streak data for a user by userId",
  tags: ["StudySolo"],
  params: {
    type: "object",
    properties: {
      user_id: { type: "string" },
    },
    required: ["user_id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date: { type: "string", format: "date" }, // "2025-07-21"
              blocks: { type: "number" },                // number of 50-min blocks
              isStreakDay: { type: "boolean" },          // blocks > 0
            },
            required: ["date", "blocks", "isStreakDay"],
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};