import { useInfiniteQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants";
import { getInfinitieMyPosts } from "@/api";


const useInfiniteMyPosts = () => {

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.myPosts,
    queryFn: ({ pageParam }) => getInfinitieMyPosts(pageParam),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      console.log(lastPage);

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    staleTime: 10 * 60 * 1000,
    initialPageParam : null
  });
};

export { useInfiniteMyPosts };