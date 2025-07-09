export interface CreatePost {
  _id: string;
  title: string;
  content: string;
  postType?: "question" | "solution" | "challenge";
  difficultyLevel?: "easy" | "medium" | "hard";
  tags?: string[];
  image?: string;
   author: {
    id: string;
    // name: string;
    avatar: string;
    level: string;
  };
  likes?: string[];
  comments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}