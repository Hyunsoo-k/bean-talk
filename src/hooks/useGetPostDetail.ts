import { useQuery } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getPostDetail } from "@/api/getPostDetail";

const useGetPostDetail = (category: Category, post_id: string ) => {
  return useQuery({
    queryKey: QUERY_KEYS.post(category, post_id),
    queryFn: () => getPostDetail(category, post_id),
  });
};

export { useGetPostDetail };