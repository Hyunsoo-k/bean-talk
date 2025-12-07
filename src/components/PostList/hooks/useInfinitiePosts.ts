import { useInfiniteQuery } from "@tanstack/react-query";

import type { PostsQueryParams } from "@/components/PostList/types/postListQueryParams";
import { axiosInstance } from "@/services";
import { QUERY_KEYS } from "@/constants";

const queryFn = async (postsQueryParams: PostsQueryParams, pageParam: string | null) => {
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

const useInfinitePosts = (postsQueryParams: PostsQueryParams) => {
  const {
    category,
    subCategory,
    queryOption,
    keyword,
  } = postsQueryParams;

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.posts(
      category,
      subCategory,
      queryOption,
      keyword
    ),
    queryFn: ({ pageParam }) => queryFn(postsQueryParams, pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export { useInfinitePosts };