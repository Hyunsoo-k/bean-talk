import { axiosInstance } from "@/services/axiosInstance";

import type { Category } from "@/types/category";

const getPostDetail = async (category: Category, post_id: string) => {
  const response = await axiosInstance.get(`/categories/${category}/posts/${post_id}`);

  return response.data;
};

export { getPostDetail };