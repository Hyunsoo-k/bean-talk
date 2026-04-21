import type { CategoryHavingSubCategory, SubCategory } from "@/types/category";
import type { SearchType } from "@/types/SearchType";

type PostsParams = {
  "sub-category"?: SubCategory<CategoryHavingSubCategory>;
  type?: SearchType;
  query?: string;
};

export type { PostsParams };