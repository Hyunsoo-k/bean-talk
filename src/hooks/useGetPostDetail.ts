import { useQuery } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { axiosInstance } from "@/services/axiosInstance";
import { QUERY_KEYS } from "@/constants";

const queryFn = async (
  category: Category,
  post_id: string
) => {
  const response = await axiosInstance.get(`/categories/${category}/posts/${post_id}`);

  return response.data;
};

const useGetPostDetail = (category: Category, post_id: string ) => {
  return useQuery({
    queryKey: QUERY_KEYS.post(category, post_id),
    queryFn: () => queryFn(category, post_id),
  });
};

export { useGetPostDetail };