import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { getInfiniteScraps } from "@/api/getInfiniteScraps";

const useInfiniteScraps = () => {

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.scraps,
    queryFn: ({ pageParam }) => getInfiniteScraps(pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export { useInfiniteScraps };