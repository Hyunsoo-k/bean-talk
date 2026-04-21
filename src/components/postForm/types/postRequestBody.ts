import type { Category, CategoryHavingSubCategory, SubCategory } from "@/types/category";

type BasePostRequestBody = {
  title: string;
  content: string;
  thumbnailUrl: string | null;
};

type PostRequestBody<T extends Category> =
  BasePostRequestBody & (
    T extends CategoryHavingSubCategory
      ? { subCategory: SubCategory<T> }
      : {}
  );

export type { PostRequestBody };