import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes.js";

export const deletePostSchema: FastifySchema = {
  description: "API for deleting a post",
  summary: "API to Delete Posts",
  tags: ["Post"],
  params: {
    type: "object",
    properties: {
      postId: {
        type: "string",
        description: "Unique identifier of the post to be deleted",
      },
    },
    required: ["postId"],
    additionalProperties: false,
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        message: { type: "string", example: "Post deleted successfully" },
        postId: { type: "string", description: "ID of the deleted post" },
      },
    },
    ...commonErrorResponses,
  },
};
