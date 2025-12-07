import type { Category, SubCategory } from "./category";

type BasePost = {
  _id: string;
  author: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  thumbnailUrl: string | null;
  title: string;
  content: string;
  commentCount: number;
  views: number;
  likes: string[];
  scraps: string[];
  createdAt: string;
  updatedAt: string;
};

type Post<T extends Category> = T extends "promotion" | "job" | "news"
  ? BasePost & { subCategory: SubCategory<T> }
  : BasePost;

export type { Post };