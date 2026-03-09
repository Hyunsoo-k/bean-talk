import type { Category } from "@/types";
import { axiosInstance } from "@/services";

const getComments = async (category: Category, post_id: string) => {
  const response = await axiosInstance.get(`/categories/${category}/posts/${post_id}/comments`);

  return response.data;
};

export { getComments };