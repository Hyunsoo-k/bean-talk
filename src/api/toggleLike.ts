import { axiosInstance } from "@/services";

import type { Category } from "@/types";

const toggleLike = async (category: Category, post_id: string) => {
  const response = await axiosInstance.patch(`/categories/${category}/posts/${post_id}/likes`);

  return response.data;
};

export { toggleLike };