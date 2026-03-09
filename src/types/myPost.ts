import type { Category } from "./category";

type MyPost = {
  _id: string;
  category: Category;
  views: number;
  likes: string[];
  scraps: string[];
  commentCount: number;
  author: string;
  thumbnailUrl: string | null;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type { MyPost };