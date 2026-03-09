import { useQuery } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants";
import { getPostDetail } from "@/api";

const useGetPostDetail = (category: Category, post_id: string ) => {
  return useQuery({
    queryKey: QUERY_KEYS.post(category, post_id),
    queryFn: () => getPostDetail(category, post_id),
  });
};

export { useGetPostDetail };