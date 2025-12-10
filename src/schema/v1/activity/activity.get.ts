import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

// ✅ GET TOP 3–4 RECENT ACTIVITIES (Dashboard)
export const getRecentActivitySchema: FastifySchema = {
  description: "API to get top 3–4 recent activities of a user",
  summary: "Get recent activities",
  tags: ["Activity"],

  params: {
    type: "object",
    properties: {
      userId: { type: "string", description: "User ID" },
    },
    required: ["userId"],
  },

  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "array",
          maxItems: 4,
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              userId: { type: "string" },
              action: { type: "string" },
              meta: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  postId: { type: "string" },
                  duration: { type: "number" },
                  roomName: { type: "string" },
                },
              },

              createdAt: { type: "string", format: "date-time" },
            },
            required: ["_id", "userId", "action", "createdAt"],
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

// ✅ GET LAST 24 HOURS ACTIVITIES
export const getLast24HoursActivitySchema: FastifySchema = {
  description: "API to get last 24 hours activity of a user",
  summary: "Get last 24 hours activities",
  tags: ["Activity"],

  params: {
    type: "object",
    properties: {
      userId: { type: "string", description: "User ID" },
    },
    required: ["userId"],
  },

  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              userId: { type: "string" },
              action: { type: "string" },
              meta: { type: "object" },
              createdAt: { type: "string", format: "date-time" },
            },
            required: ["_id", "userId", "action", "createdAt"],
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
