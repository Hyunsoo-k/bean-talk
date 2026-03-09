import type { Category, PostRequestBody } from "@/types";
import { axiosInstance } from "@/services";

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