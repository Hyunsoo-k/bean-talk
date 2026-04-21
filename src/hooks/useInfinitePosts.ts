import { useInfiniteQuery } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import type { PostsParams } from "@/types/postsParams";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getInfinitePosts } from "@/api/getInfinitePosts";


const useInfinitePosts = (category: Category, params?: PostsParams) => {
  const response = useInfiniteQuery({
    queryKey: QUERY_KEYS.posts(category, params),
    queryFn: ({ pageParam }) => getInfinitePosts(category, pageParam, params),
    getNextPageParam: (lastPage) => {
      const { hasNextPage, nextCursor } = lastPage;

      return hasNextPage && nextCursor ? nextCursor : null;
    },
    initialPageParam : undefined
  });

  const flattenedData = response.data?.pages?.flatMap((page) => page.posts) ?? [];

  return { ...response, flattenedData }
};

export { useInfinitePosts };