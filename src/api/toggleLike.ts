import type { Category } from "@/types/category";
import { axiosInstance } from "@/services/axiosInstance";

const toggleLike = async (category: Category, post_id: string) => {
  const response = await axiosInstance.patch(`/categories/${category}/posts/${post_id}/likes`);

  return response.data;
};

export { toggleLike };