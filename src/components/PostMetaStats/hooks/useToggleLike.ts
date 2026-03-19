import { useMutation } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { toggleLike } from "@/api/toggleLike";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";

const useToggleLike = (category: Category, post_id: string) => {
  return useMutation({
    mutationFn: () => toggleLike(category, post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post(category, post_id) });
    }
  })
};

export { useToggleLike };