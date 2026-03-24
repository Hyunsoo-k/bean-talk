import { useInfiniteQuery } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import type { QueryParams } from "@/types/queryParams";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getInfinitiePosts } from "@/api/getInfinitiePosts";


const useInfinitePosts = (category: Category, queryParams?: QueryParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.posts(category, queryParams),
    queryFn: ({ pageParam }) => getInfinitiePosts(category, pageParam, queryParams),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export { useInfinitePosts };