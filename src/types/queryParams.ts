import type { CategoryHavingSubCategory, SubCategory } from "@/types/category";
import type { SearchTarget } from "@/types/searchTarget";

type QueryParams = {
  subCategory?: SubCategory<CategoryHavingSubCategory> | null;
  searchTarget: SearchTarget | null,
  searchQuery: string | null;
};

export type { QueryParams };