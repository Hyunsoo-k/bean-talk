import type {
  Category,
  CategoryHavingSubCategory,
  SubCategory
} from "@/types/category";
import type { QueryParams } from "@/types/queryParams";
import { axiosInstance } from "@/services/axiosInstance";
import type { SearchTarget } from "@/types/searchTarget";

const getInfinitiePosts = async (
  category: Category,
  pageParam: string | null,
  queryParams?: QueryParams,
) => {
  let params = {
    cursor: pageParam
  } as {
    cursor: string | null,
    "sub-category"?: SubCategory<CategoryHavingSubCategory> | null,
    "search-target"?: SearchTarget | null,
    "search-query"?: string | null
  };

  if (queryParams) {
    const {
      subCategory,
      searchTarget,
      searchQuery
    } = queryParams;

    params = {
      ...params,
      "sub-category": subCategory,
      "search-target": searchTarget,
      "search-query": searchQuery,
    }
  }

  const response = await axiosInstance.get(
    `/categories/${category}/posts`,
    { params }
  );
  
  return response.data;
};

export { getInfinitiePosts };