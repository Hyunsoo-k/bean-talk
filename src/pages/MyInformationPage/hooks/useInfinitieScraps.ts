import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants";
import { getInfinitieScraps } from "@/api";

const useInfinitieScraps = () => {

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.scraps,
    queryFn: ({ pageParam }) => getInfinitieScraps(pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export { useInfinitieScraps };