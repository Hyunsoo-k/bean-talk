import type { Category } from "@/types/category";
import { axiosInstance } from "@/services/axiosInstance";

const getComments = async (category: Category, post_id: string) => {
  const response = await axiosInstance.get(`/categories/${category}/posts/${post_id}/comments`);

  return response.data;
};

export { getComments };