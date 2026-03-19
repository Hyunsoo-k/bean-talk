import type { Category } from "@/types/category";
import { axiosInstance } from "@/services/axiosInstance";

const editReply = async (
  category: Category,
  post_id: string,
  comment_id: string,
  reply_id: string,
  requestBody: Record<"content", string>
) => {
  const response = await axiosInstance.patch(
    `/categories/${category}/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`,
    requestBody
  );

  return response.data;
};

export { editReply };