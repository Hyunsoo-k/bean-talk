import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys"
import { getInfiniteLocals } from "@/api/getInfiniteLocals";

const useInfiniteLocals = (query: string) => {
  const response = useInfiniteQuery({
    queryKey: QUERY_KEYS.locals(query),
    queryFn: ({ pageParam }) => getInfiniteLocals(query, pageParam as number),
    getNextPageParam: (lastPage) => {
      const { isEnd } = lastPage;

      return isEnd ? isEnd : null;
    },
    initialPageParam : 1,
    enabled: !!query
  });

  const flattenedLocals = response.data?.pages?.flatMap((page) => page.locals) ?? [];

  return { ...response, flattenedLocals }
};

export { useInfiniteLocals };