import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, Inject, POST, DELETE, PUT } from "fastify-decorators";
import { POST_BASE_ENDPOINT,
  CREATE_POST_ENDPOINT, 
  GET_ALL_POSTS_ENDPOINT, 
  GET_USER_POSTS_BY_ID, 
  LIKE_POST_BY_ID, 
  DISLIKE_POST_BY_ID, 
  CREATE_COMMENTS_BY_ID, 
  GET_COMMENTS_BY_ID, 
  DELETE_POST_BY_ID, 
  BOOKMARK_POST_BY_ID,
  UPDATE_POST_BY_ID,
  GET_CONTRIBUTION_COUNT_BY_ID
 } from "../constants/post.constant";
import { AuthController } from "../common/auth.controller";
import { PostService } from "../services/post.service";
import { ERROR_CODES, RESPONSE_MESSAGE, STATUS_CODES } from "../common/constants";
// import { createPostSchema } from "../schema/v1/post/post.create";

import { createCommentsSchema, createPostSchema } from "../schema/v1/post/post.create";
import { deletePostSchema } from "../schema/v1/post/post.delete";
import { getBookmarksSchema, getCommentsSchema, getContributionCountSchema, getDislikesSchema, getLikesSchema, getPostByIdSchema, getPostsSchema } from "../schema/v1/post/post.get";
import { updatePostSchema } from "../schema/v1/post/post.update";

@Controller({ route: POST_BASE_ENDPOINT })
export default class PostController extends AuthController {
  @Inject(PostService)
  postService!: PostService;

  @POST(CREATE_POST_ENDPOINT, { schema: createPostSchema })
  async addPost(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
      this.logger.info(`PostController -> addPost -> Adding new post`);
      const data = await this.postService.create(request.body);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in addPost: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({
        message: RESPONSE_MESSAGE.SERVER_ERROR,
        code: ERROR_CODES.SERVER_ERROR,
      });
    }
  }

  @GET(GET_ALL_POSTS_ENDPOINT,{schema:getPostsSchema})
  async getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.postService.getAll();
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getAllPosts: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    }
  }

 @GET(GET_USER_POSTS_BY_ID, { schema: getPostByIdSchema })
async getUserPosts(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  if (!id) {
    return reply.status(STATUS_CODES.BAD_REQUEST).send({ message: "User ID param missing" });
  }

  try {
    console.log("User ID:", id);
    const data = await this.postService.getUserPosts(id); // <-- pass the param `id` here
    console.log("User posts:", data);
    return reply.status(STATUS_CODES.SUCCESS).send({ data });
  } catch (error: any) {
    this.logger.error(`Error in getUserPosts: ${error.message}`);
    reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
  }
}


@GET(GET_CONTRIBUTION_COUNT_BY_ID,{schema:getContributionCountSchema})
async getContributionCount(
  request: FastifyRequest<{ Params: { user_id: string } }>,
  reply: FastifyReply
) {
  try {
    const count = await this.postService.getContributionCount(request.params.user_id);
    reply.status(STATUS_CODES.SUCCESS).send({ data: { contributionCount: count } });
  } catch (error: any) {
    this.logger.error(`Error in getContributionCount: ${error.message}`);
    reply.status(STATUS_CODES.SERVER_ERROR).send({
      message: RESPONSE_MESSAGE.SERVER_ERROR,
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
}

  @GET(LIKE_POST_BY_ID,{schema:getLikesSchema})
  async likePost(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const data = await this.postService.like(request.params.id, request.userId);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in likePost: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    }
  }

  @GET(DISLIKE_POST_BY_ID,{schema: getDislikesSchema})
  async dislikePost(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const data = await this.postService.dislike(request.params.id, request.userId);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in dislikePost: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    }
  }

  @POST(CREATE_COMMENTS_BY_ID,{schema:createCommentsSchema})
  async addComment(request: FastifyRequest<{ Body: any; Params: { id: string } }>, reply: FastifyReply) {
    try {
      const data = await this.postService.createComment(request.params.id, request.body, request.userId);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in addComment: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    }
  }

  @GET(GET_COMMENTS_BY_ID,{schema: getCommentsSchema})
  async getComments(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const data = await this.postService.getComments(request.params.id);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in getComments: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    }
  }

@DELETE(DELETE_POST_BY_ID, { schema: deletePostSchema })
async deletePost(request: FastifyRequest<{ Params: { postId: string } }>, reply: FastifyReply) {
  try {
    const { postId } = request.params;
    const userId = request.userId;
      console.log("Deleting postId:", postId);
    console.log("With userId:", userId);

    const result = await this.postService.delete(postId, userId);
      console.log("Mongo Delete Result:", result); // <- see this
    reply.status(200).send({
      message: "Post deleted successfully",
      postId,
    });
  } catch (error: any) {
    this.logger.error(`Error in deletePost: ${error.message}`);
    reply.status(500).send({ message: "Internal Server Error" });
  }
}


  @PUT(UPDATE_POST_BY_ID, { schema: updatePostSchema })
  async updatePost(
    request: FastifyRequest<{ Params: { id: string }; Body: any }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const updatedPost = await this.postService.update(id, request.body, request.userId);
  
      if (!updatedPost) {
        return reply.status(STATUS_CODES.NOT_FOUND).send({ message: "Post not found" });
      }
  
      reply.status(STATUS_CODES.SUCCESS).send({ message: "Post updated successfully", data: updatedPost });
    } catch (error: any) {
      this.logger.error(`Error in updatePost: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    }
  }
  
  @GET(BOOKMARK_POST_BY_ID,{schema: getBookmarksSchema})
  async bookmarkPost(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const data = await this.postService.bookmark(request.params.id, request.userId);
      reply.status(STATUS_CODES.SUCCESS).send({ data });
    } catch (error: any) {
      this.logger.error(`Error in bookmarkPost: ${error.message}`);
      reply.status(STATUS_CODES.SERVER_ERROR).send({ message: RESPONSE_MESSAGE.SERVER_ERROR });
    }
  }
}

