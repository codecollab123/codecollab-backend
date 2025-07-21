export interface GetPost {
    postId: string; 
    author: {
    id: string;
    name: string;
    avatar: string;
    level: string;
  };
 }