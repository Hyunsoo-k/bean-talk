import type { Category } from "@/types";
import { useMutation } from "@tanstack/react-query";

import { toggleLike } from "@/api";
import { QUERY_KEYS, queryClient } from "@/constants";

const useToggleLike = (category: Category, post_id: string) => {
  return useMutation({
    mutationFn: () => toggleLike(category, post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post(category, post_id) });
    }
  })
};

export { useToggleLike };