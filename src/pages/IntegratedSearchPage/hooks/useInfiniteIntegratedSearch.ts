import { useInfiniteQuery } from "@tanstack/react-query";

import type { PostsParams } from "@/types/postsParams";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getInfiniteIntegratedSearch } from "@/api/getInfiniteIntegratedPosts";

const useInfiniteIntegratedSearch = (queryParams: PostsParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.integratedPosts(queryParams),
    queryFn: ({ pageParam }) => getInfiniteIntegratedSearch(queryParams, pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  })
};

export { useInfiniteIntegratedSearch };