import type { Category } from "@/types/category";
import type { PostsParams } from "@/types/postsParams";
import { axiosInstance } from "@/services/axiosInstance";

const getInfinitePosts = async (
  category: Category,
  pageParam: string | undefined,
  params?: PostsParams
) => {
  console.log(params)
  const response = await axiosInstance.get(`/categories/${category}/posts`, {
    params: { ...params, cursor: pageParam ?? undefined }
  });
  
  return response.data;
};

export { getInfinitePosts };