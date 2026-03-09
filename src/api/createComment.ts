import type { Category } from "@/types";
import { axiosInstance } from "@/services";

const createComment = async (
  category: Category,
  post_id: string,
  requestBody: Record<"content", string>
) => {
  const response = await axiosInstance.post(
    `/categories/${category}/posts/${post_id}/comments`,
    requestBody
  );

  return response.data;
};

export { createComment };