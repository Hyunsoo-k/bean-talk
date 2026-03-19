import type { Category } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import { axiosInstance } from "@/services/axiosInstance";

const createPostDetail = async (
  category: Category,
  requestBody: PostRequestBody<typeof category>
) => {
  const response = await axiosInstance.post(
    `/categories/${category}/posts`,
    requestBody
  );

  return response.data;
};

export { createPostDetail };