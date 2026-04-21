import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { getInfiniteMyPosts } from "@/api/getInfiniteMyPosts";


const useInfiniteMyPosts = () => {

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.myPosts,
    queryFn: ({ pageParam }) => getInfiniteMyPosts(pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export { useInfiniteMyPosts };