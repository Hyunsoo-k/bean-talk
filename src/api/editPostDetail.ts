import type { Category } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import { axiosInstance } from "@/services/axiosInstance";

const editPostDetail = async (
  category: Category,
  post_id: string,
  requestBody: PostRequestBody<typeof category>
) => {
  const response = await axiosInstance.patch(
    `/categories/${category}/posts/${post_id}`,
    requestBody
  );

  return response.data;
};

export { editPostDetail };