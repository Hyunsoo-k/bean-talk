import { axiosInstance } from "@/services";

import type { Category } from "@/types";

const getPostDetail = async (category: Category, post_id: string) => {
  const response = await axiosInstance.get(`/categories/${category}/posts/${post_id}`);

  return response.data;
};

export { getPostDetail };