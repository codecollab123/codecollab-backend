import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const updatePostSchema: FastifySchema = {
  description: "API for updating a post",
  summary: "Update post",
  tags: ["Post"],
  params: {
    type: "object",
    properties: {
      postId: { type: "string", description: "Post ID to update" },
    },
    required: ["postId"],
  },
body: {
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    image: { type: "string" },
    tags: {
      type: "array",
      items: { type: "string" }
    }
  },
  additionalProperties: false
},
   response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        message: { type: "string", example: "Post updated successfully" },
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            image: { type: "string" },
            tags: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["_id", "title", "content"],
        },
      },
    },
    ...commonErrorResponses,
  },
};