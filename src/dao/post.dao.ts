import { Model } from "mongoose";
import { Service } from "fastify-decorators";
import { BaseDAO } from "../common/base.dao";
import PostModel, { IPost } from "../models/post.entity";

@Service()
export class PostDAO extends BaseDAO {
  model: Model<IPost>;

  constructor() {
    super();
    this.model = PostModel;
  }

  async getPostById(postId: string) {
    try {
      return await this.model.findById(postId);
    } catch (error: any) {
      throw new Error(`Failed to get post by ID: ${error.message}`);
    }
  }

  async createPost(data: IPost) {
    try {
      const post = await this.model.create(data);
      return post;
    } catch (error: any) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }


  async getContributionCountByUser(userId: string): Promise<number> {
  try {
    return await this.model.countDocuments({ author: userId });
  } catch (error: any) {
    throw new Error(`Failed to get contribution count: ${error.message}`);
  }
}

 
  async getAllPosts() {
    try {
      return await this.model.find();
    } catch (error: any) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }

async getUserPosts(userId: string) {
  return await this.model.find({ author: userId });
}



  async likePost(postId: string, userId: string) {
    try {
      return await this.model.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    } catch (error: any) {
      throw new Error(`Failed to like post: ${error.message}`);
    }
  }

  async dislikePost(postId: string, userId: string) {
    try {
      return await this.model.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
    } catch (error: any) {
      throw new Error(`Failed to dislike post: ${error.message}`);
    }
  }

  async createComment(postId: string, commentData: any) {
    try {
      return await this.model.findByIdAndUpdate(
        postId,
        { $push: { comments: commentData } },
        { new: true }
      );
    } catch (error: any) {
      throw new Error(`Failed to add comment: ${error.message}`);
    }
  }

  async getComments(postId: string) {
    try {
      const post = await this.model.findById(postId).select("comments");
      return post ? post.comments : [];
    } catch (error: any) {
      throw new Error(`Failed to get comments: ${error.message}`);
    }
  }

  async deletePost(postId: string, userId: string) {
    try {
      return await this.model.findOneAndDelete({ _id: postId, userId });
    } catch (error: any) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }
  async updatePost(postId: string, updateData: any) {
    return await this.model.findByIdAndUpdate(postId, updateData, { new: true });
  }
  
  async bookmarkPost(postId: string, userId: string) {
    try {
      return await this.model.findByIdAndUpdate(
        postId,
        { $addToSet: { bookmarks: userId } },
        { new: true }
      );
    } catch (error: any) {
      throw new Error(`Failed to bookmark post: ${error.message}`);
    }
  }
}
