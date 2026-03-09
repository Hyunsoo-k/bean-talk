import type { Category, SubCategory } from "@/types/category";
import type { QueryOption } from "@/types/queryOption";

type PostsQueryParams = {
  category: Category;
  subCategory?: SubCategory;
  queryOption?: QueryOption,
  keyword?: string;
  cursor?: string;
};

export type { PostsQueryParams };