import type { Category } from "@/types";
import { axiosInstance } from "@/services";

const createReply = async (
  category: Category,
  post_id: string,
  comment_id: string,
  requestBody: Record<"content", string>
) => {
  const response = await axiosInstance.post(
    `/categories/${category}/posts/${post_id}/comments/${comment_id}/replies`,
    requestBody
  );

  return response.data;
};

export { createReply };