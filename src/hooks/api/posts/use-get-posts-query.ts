import { useQuery } from "@tanstack/react-query";

import type { Category, SubCategory } from "@/types/category";
import type { QueryOption } from "@/types/query-option";
import instance from "@/axios/instance";
import queryKeys from "@/query-keys";

const queryFn = async (
  category: Category,
  subCategory: SubCategory,
  queryOption?: QueryOption,
  keyword?: string
) => {
  const endPoint = queryOption && keyword
    ? `/bbs/categories/${category}/sub-categories/${subCategory}/posts?queryOption=${queryOption}&keyword=${keyword}`
    : `/bbs/categories/${category}/sub-categories/${subCategory}/posts`
  const response = await instance.get(endPoint);

  return response.data;
};

const useGetPostsQuery = (
  category: Category,
  subCategory: SubCategory = "all",
  queryOption?: QueryOption,
  keyword?: string,
) => {
  const postsQueryKey = queryOption && keyword
    ? queryKeys.posts(category, subCategory, queryOption, keyword)
    : queryKeys.posts(category, subCategory)

  return useQuery({
    queryKey: postsQueryKey,
    queryFn: () => {
      if (queryOption && keyword) {
        return queryFn(category, subCategory, queryOption, keyword);
      }

      return queryFn(category, subCategory);
    }
  });
};

export default useGetPostsQuery;