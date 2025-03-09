export interface UpdatePost {
    postId: string;   // Required for identifying which post to update
    caption?: string;
    image?: string;
    likes?:string;
    comments?:string;
    updatedAt?: Date;
  }