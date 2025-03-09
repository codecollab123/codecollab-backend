import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const updatePostSchema: FastifySchema = {
  description: "API for updating a post",
  summary: "API to Update Posts",
  tags: ["Post"],
  body: {
    type: "object",
    properties: {
      postId: { type: "string", description: "Unique identifier of the post" },
      caption: { type: "string", description: "Updated caption of the post" },
      image: { type: "string", description: "Updated image URL" },
      comments:{type:"string",description:"updated comments if did "},
      likes:{type:"string",description:"updated likes into dislike or unlike"}
    },
    required: ["postId"], // Enforcing postId as mandatory for updates
    additionalProperties: false,
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
            postId: { type: "string" },
            caption: { type: "string" },
            image: { type: "string" },
            comments:{type:"string"},
            likes:{type:"string"},
          },
          additionalProperties: false,
        },
      },
    },
    ...commonErrorResponses,
  },
};


//export interface UpdatePost {
//   postId: string;   // Required for identifying which post to update
//   caption?: string;
//   image?: string;
//   likes?:string;
//   comments?:string;
//   updatedAt?: Date;
// }