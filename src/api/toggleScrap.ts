import { axiosInstance } from "@/services/axiosInstance";

import type { Category } from "@/types/category";

const toggleScrap = async (category: Category, post_id: string) => {
  const response = await axiosInstance.patch(`/categories/${category}/posts/${post_id}/scraps`);

  return response.data;
};

export { toggleScrap };