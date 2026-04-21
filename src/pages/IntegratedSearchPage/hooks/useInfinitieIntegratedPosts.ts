import { useInfiniteQuery } from "@tanstack/react-query";

import type { QueryParams } from "@/types/queryParams";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getInfinitieIntegratedPosts } from "@/api/getInfinitieIntegratedPosts";

const useInfinitieIntegratedPosts = (queryParams: QueryParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.integratedPosts(queryParams),
    queryFn: ({ pageParam }) => getInfinitieIntegratedPosts(queryParams, pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  })
};

export { useInfinitieIntegratedPosts };