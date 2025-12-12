import { Service, Inject } from "fastify-decorators";
import { BaseService } from "../common/base.service.js";
import { PostDAO } from "../dao/post.dao.js";
import { ActivityService } from "./activity.service.js";

@Service()
export class PostService extends BaseService {
  @Inject(PostDAO)
  private postDAO!: PostDAO;

  @Inject(ActivityService)
  private activityService!: ActivityService;

  async create(body: any) {
    try {
      this.logger.info(`PostService: create -> Creating Post`);

      const post = await this.postDAO.createPost(body);

      await this.activityService.logActivity(body.author.id, "CREATED_POST", {
        postId: post._id,
        title:post.title,
      });

      return post;
    } catch (error: any) {
      this.logger.error(`Error in create Post: ${error.message}`);
      throw error;
    }
  }

  async getAll() {
    return await this.postDAO.getAllPosts();
  }

  async getUserPosts(userId: string) {
    if (!userId) throw new Error("User ID is required");
    return await this.postDAO.getUserPosts(userId);
  }

  async getContributionCount(userId: string): Promise<number> {
    if (!userId) throw new Error("User ID is required");
    return await this.postDAO.getContributionCountByUser(userId);
  }

  // async like(postId: string, userId: string) {
  //   if (!userId) throw new Error("User ID is required");
  //   return await this.postDAO.likePost(postId, userId);
  // }

  // async dislike(postId: string, userId: string) {
  //   if (!userId) throw new Error("User ID is required");
  //   return await this.postDAO.dislikePost(postId, userId);
  // }

  async createComment(postId: string, commentData: any, userId: string) {
    if (!userId) throw new Error("User ID is required");
    return await this.postDAO.createComment(postId, { ...commentData, userId });
  }

  async getComments(postId: string) {
    if (!postId) throw new Error("Post ID is required");
    return await this.postDAO.getComments(postId);
  }

  async findPostById(postId: string) {
    if (!postId) throw new Error("Post ID is required");
    return await this.postDAO.getPostById(postId);
  }

  async update(postId: string, updateData: any, userId: string) {
    if (!postId) throw new Error("Post ID is required");

    const existingPost = await this.postDAO.getPostById(postId);
    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.author.id !== userId) {
      throw new Error("Unauthorized: You can only update your own posts");
    }

    return await this.postDAO.updatePost(postId, updateData);
  }

  async delete(postId: string, userId: string) {
    return await this.postDAO.deletePost(postId, userId);
  }

  async bookmark(postId: string, userId: string) {
    return await this.postDAO.bookmarkPost(postId, userId);
  }
}
