import { useMutation } from "@tanstack/react-query";

import type { Category } from "@/types";
import { toggleScrap } from "@/api";
import { QUERY_KEYS, queryClient } from "@/constants";

const useToggleScrap = (category: Category, post_id: string) => {
  return useMutation({
    mutationFn: () => toggleScrap(category, post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post(category, post_id) });
    }
  })
};

export { useToggleScrap };