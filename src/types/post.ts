import type { Category, CategoryHavingSubCategory, SubCategory } from "./category";

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

type Post<T extends Category> = T extends CategoryHavingSubCategory
  ? BasePost & { subCategory: SubCategory<T> }
  : BasePost;

export type { Post };