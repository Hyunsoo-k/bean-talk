import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { Category, SubCategory } from "@/types/category";
import type { QueryOption } from "@/types/query-option";
import instance from "@/axios/instance";
import queryKeys from "@/query-keys";

const queryFn = async (
  category: Category,
  subCategory: SubCategory,
  cursor: string | null = null,
  queryOption?: QueryOption,
  keyword?: string
) => {
  let endPoint = `/bbs/categories/${category}/sub-categories/${subCategory}/posts`
  const queryStrings = [];

  if (queryOption && keyword) {
    queryStrings.push(`queryOPtion=${queryOption}&keyword=${keyword}`);
  }

  if (cursor) {
    queryStrings.push(`cursor=${cursor}`);
  }

  if (queryStrings.length > 0) {
    endPoint += "?" + queryStrings.join("&");
  }

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

  return useInfiniteQuery({
    queryKey: postsQueryKey,
    queryFn: ({ pageParam: cursor = null }) => {
      if (queryOption && keyword) {
        return queryFn(category, subCategory, cursor, queryOption, keyword);
      }

      return queryFn(category, subCategory, cursor);
    },
    getNextPageParam: (lastPageQuery) => {
      const { hasNextPage, nextCursor } = lastPageQuery;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export default useGetPostsQuery;