import type { PostsParams } from "@/types/postsParams";
import { axiosInstance } from "@/services/axiosInstance";

const getInfiniteIntegratedSearch = async (queryParams: PostsParams, cursor: string | null) => {
  const response = await axiosInstance.get(
    "/integrated-search",
    {
      params: {
        "sub-category": queryParams?.["sub-category"],
        "type": queryParams?.type,
        "query": queryParams?.query,
        cursor: cursor ?? undefined
      }
    }
  );

  return response.data;
};

export { getInfiniteIntegratedSearch };