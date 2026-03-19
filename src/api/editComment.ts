import type { Category } from "@/types/category";
import { axiosInstance } from "@/services/axiosInstance";

const editComment = async (
  category: Category,
  post_id: string,
  comment_id: string,
  requestBody: Record<"content", string>
) => {
  const response = await axiosInstance.patch(
    `/categories/${category}/posts/${post_id}/comments/${comment_id}`,
    requestBody
  );

  return response.data;
};

export { editComment };