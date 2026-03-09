import type { Category } from "@/types";
import { axiosInstance } from "@/services";

const deleteComment = async (
  category: Category,
  post_id: string,
  comment_id: string
) => {
  const response = await axiosInstance.delete(`/categories/${category}/posts/${post_id}/comments/${comment_id}`);

  return response.data;
};

export { deleteComment };