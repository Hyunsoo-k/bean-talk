import { useInfiniteQuery } from "@tanstack/react-query";

import type { PostsQueryParams } from "@/components/PostList/types/postListQueryParams";
import { QUERY_KEYS } from "@/constants";
import { getInfinitiePosts } from "@/api";


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
    queryFn: ({ pageParam }) => getInfinitiePosts(postsQueryParams, pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export { useInfinitePosts };