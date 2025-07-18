import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const updateNotificationSchema: FastifySchema = {
  description: "API for updating a Notification by ID",
  tags: ["Notification"],
  params: {
    type: "object",
    properties: {
      notification_id: { type: "string" },
    },
    required: ["notification_id"],
  },
  body: {
    type: "object",
    properties: {
      heading: { type: "string" },
      description: { type: "string" },
      status: {
        type: "string",
        enum: ["active", "inactive"],
      },
      background_img: { type: "string" },
      importantUrl: {
        type: "array",
        items: {
          type: "object",
          properties: {
            urlName: { type: "string" },
            url: { type: "string" },
          },
        },
      },
    },
    required: [],
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            heading: { type: "string" },
            description: { type: "string" },
            status: { type: "string" },
            background_img: { type: "string" },
            importantUrl: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  urlName: { type: "string" },
                  url: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
