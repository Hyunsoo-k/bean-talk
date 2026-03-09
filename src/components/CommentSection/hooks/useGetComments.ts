import { useQuery } from "@tanstack/react-query";

import type { Category } from "@/types";
import { QUERY_KEYS } from "@/constants";
import { getComments } from "@/api";

const useGetComments = (category: Category, post_id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.comments(category, post_id),
    queryFn: () => getComments(category, post_id)
  });
};

export { useGetComments };