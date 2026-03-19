import type { Category } from "@/types/category";
import { axiosInstance } from "@/services/axiosInstance";

const deleteComment = async (
  category: Category,
  post_id: string,
  comment_id: string
) => {
  const response = await axiosInstance.delete(`/categories/${category}/posts/${post_id}/comments/${comment_id}`);

  return response.data;
};

export { deleteComment };