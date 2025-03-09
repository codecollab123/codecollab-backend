import { FastifySchema } from "fastify";
import { commonErrorResponses } from "../commonErrorCodes";

export const getPostsSchema: FastifySchema = {
  description: "API for retrieving posts",
  summary: "API to Get All Posts",
  tags: ["Post"],
  querystring: {
    type: "object",
    properties: {
      userId: { type: "string", description: "Enter your userId to filter posts" },
      page: { type: "integer", minimum: 1, description: "Page number for pagination" },
      limit: { type: "integer", minimum: 1, description: "Number of posts per page" },
    },
    required: ["userId"],
    additionalProperties: false,
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
              caption: { type: "string" },
              image: { type: "string" },
              author: { type: "string" },
              likes: { type: "array", items: { type: "string" } },
              comments: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getPostByIdSchema: FastifySchema = {
  description: "API to fetch a single post by ID",
  summary: "Get post by ID",
  tags: ["Post"],
  params: {
    type: "object",
    properties: {
      id: { type: "string", description: "Unique Post ID" },
    },
    required: ["id"],
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
            likes: { type: "array", items: { type: "string" } },
            comments: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getCommentsSchema: FastifySchema = {
  description: "API to get comments for a post",
  summary: "Fetch comments for a post",
  tags: ["Post"],
  params: {
    type: "object",
    properties: {
      id: { type: "string", description: "Post ID to get comments" },
    },
    required: ["id"],
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
              comments: { type: "string" },
              author: { type: "string" },
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

// ✅ Get Likes Schema
export const getLikesSchema: FastifySchema = {
  description: "API to get likes of a post",
  summary: "Fetch likes for a post",
  tags: ["Post"],
  params: {
    type: "object",
    properties: {
      id: { type: "string", description: "Post ID to get likes" },
    },
    required: ["id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "string",
            description: "User IDs who liked the post",
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

// ✅ Get Dislikes Schema
export const getDislikesSchema: FastifySchema = {
  description: "API to get dislikes of a post",
  summary: "Fetch dislikes for a post",
  tags: ["Post"],
  params: {
    type: "object",
    properties: {
      id: { type: "string", description: "Post ID to get dislikes" },
    },
    required: ["id"],
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "string",
            description: "User IDs who disliked the post",
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};

export const getBookmarksSchema: FastifySchema = {
  description: "API to get bookmarks of a user",
  summary: "Fetch bookmarked posts",
  tags: ["Post"],
  querystring: {
    type: "object",
    properties: {
      userId: { type: "string", description: "User ID to get bookmarks" },
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
              caption: { type: "string" },
              image: { type: "string" },
              author: { type: "string" },
            },
          },
        },
      },
    },
    ...commonErrorResponses,
  },
};