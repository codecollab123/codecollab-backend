// import { FastifySchema } from "fastify";
// import { commonErrorResponses } from "../commonErrorCodes";

// export const createPostSchema: FastifySchema = {
//   description: "API to create a new post",
//   summary:"API to create a new post",
//   tags: ["Post"],
//   body: {
//     type: "object",
//     properties: {
//       caption: { type: "string" },
//       image: { type: "string" },
//       author: { type: "string" },
//       likes: {
//         type: "array",
//         items: { type: "string" },
//       },
//       comments: {
//         type: "array",
//         items: { type: "string" },
//       },
//     },
//     required: ["image", "author"],
//   },
//   response: {
//     200: {
//       description: "Success",
//       type: "object",
//       properties: {
//         data: {
//           type: "object",
//           properties: {
//             _id: { type: "string" },
//             caption: { type: "string" },
//             image: { type: "string" },
//             author: { type: "string" },
//           },
//         },
//       },
//     },
//     ...commonErrorResponses,
//   },
// };

// export const createCommentsSchema: FastifySchema = {
//   description: "API to create a comment",
//   summary:"API to create a comment",
//   tags: ["Post"],
//   body: {
//     type: "object",
//     properties: {
//       comments: {
//         type: "array",
//         items: { type: "string" },
//       },
//     },
//     required: ["image", "author"],
//   },
//   response: {
//     200: {
//       description: "Success",
//       type: "object",
//       properties: {
//         data: {
//           type: "object",
//           properties: {
//             _id: { type: "string" },
//             author: { type: "string" },
//           },
//         },
//       },
//     },
//     ...commonErrorResponses,
//   },
// };



import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const createPostSchema: FastifySchema = {
  description: "API to create a new post",
  summary: "API to create a new post",
  tags: ["Post"],
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      content: { type: "string" },
      postType: { type: "string", enum: ["question", "solution", "challenge"] },
      difficultyLevel: { type: "string", enum: ["easy", "medium", "hard"] },
      tags: {
        type: "array",
        items: { type: "string" }
      },
      image: { type: "string" },
      author: { type: "string" },
      likes: {
        type: "array",
        items: { type: "string" }
      },
     comments: {
       type: "array",
         items: { type: "string" },
     },
    },
    // Only "title" and "content" are required, rest are optional
    required: ["title", "content"],
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
            title: { type: "string" },
            content: { type: "string" },
            postType: { type: "string" },
            difficultyLevel: { type: "string" },
            tags: {
              type: "array",
              items: { type: "string" }
            },
            image: { type: "string" },
            author: { type: "string" },
            likes: {
              type: "array",
              items: { type: "string" }
            },
            comments: {
              type: "array",
              items: { type: "string" }
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};


export const createCommentsSchema: FastifySchema = {
  description: "API to add a comment to a post",
  summary: "Add comment",
  tags: ["Post"],
  body: {
    type: "object",
    properties: {
      text: { type: "string" },
    },
    required: ["text"],
  },
  response: {
    200: {
      description: "Comment added successfully",
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            _id: { type: "string" },
            text: { type: "string" },
            author: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};