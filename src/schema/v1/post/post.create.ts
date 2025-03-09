import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createPostSchema: FastifySchema = {
  description: "API to create a new post",
  summary:"API to create a new post",
  tags: ["Post"],
  body: {
    type: "object",
    properties: {
      caption: { type: "string" },
      image: { type: "string" },
      author: { type: "string" },
      likes: {
        type: "array",
        items: { type: "string" },
      },
      comments: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["image", "author"],
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
            caption: { type: "string" },
            image: { type: "string" },
            author: { type: "string" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const createCommentsSchema: FastifySchema = {
  description: "API to create a comment",
  summary:"API to create a comment",
  tags: ["Post"],
  body: {
    type: "object",
    properties: {
      comments: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["image", "author"],
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
            author: { type: "string" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};
