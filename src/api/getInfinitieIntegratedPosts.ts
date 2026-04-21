import type { QueryParams } from "@/types/queryParams";
import { axiosInstance } from "@/services/axiosInstance";

const getInfinitieIntegratedPosts = async (queryParams: QueryParams, cursor: string | null) => {
  const response = await axiosInstance.get(
    "/integrated-search",
    {
      params: {
        "sub-category": queryParams?.subCategory,
        "search-target": queryParams?.searchTarget,
        "search-query": queryParams?.searchQuery,
        cursor
      }
    }
  );

  return response.data;
};

export { getInfinitieIntegratedPosts };