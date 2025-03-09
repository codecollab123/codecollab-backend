export interface createPost {
    _id: string;
    caption?: string;
    image: string;
    author: string;
    likes?: string[]; 
    comments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  