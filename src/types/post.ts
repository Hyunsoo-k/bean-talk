import type { Category, SubCategory } from "./category";

type BasePost = {
  _id: string;
  author: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  thumbnailUrl: string | null;
  category: Category;
  title: string;
  content: string;
  commentCount: number;
  views: number;
  likes: string[];
  scraps: string[];
  createdAt: string;
  updatedAt: string;
};

type Post<T extends Category> = 
  T extends "promotion" | "news"
    ? BasePost & { subCategory: SubCategory<T> }
  : T extends "job"
    ? BasePost & {
        subCategory: SubCategory<T>;
        employmentType: "partTime" | "fullTime";
        position: "barista" | "manager";
        payAmount: number;
        startTime: string;
        endTime: string;
        address?: string;
        latitude?: number;
        longitude?: number;
      }
  : BasePost;

export type { Post };