import type { PostsQueryParams } from "@/components/PostList/types";
import { axiosInstance } from "@/services";

const getInfinitiePosts = async (postsQueryParams: PostsQueryParams, pageParam: string | null) => {
  const {
    category,
    subCategory,
    queryOption,
    keyword,
  } = postsQueryParams;

  let endPoint = `/categories/${category}/posts`;
  
  const queryStrings = [];

  if (queryOption && keyword) {
    queryStrings.push(`query-option=${queryOption}&keyword=${keyword}`);
  }

  if (subCategory) {
    queryStrings.push(`sub-category=${subCategory}`);
  }

  if (pageParam) {
    queryStrings.push(`cursor=${pageParam}`);
  }

  if (queryStrings.length > 0) {
    endPoint += "?" + queryStrings.join("&");
  }

  const response = await axiosInstance.get(endPoint);
  
  return response.data;
};

export { getInfinitiePosts };