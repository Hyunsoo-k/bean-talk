import { useMutation } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { toggleScrap } from "@/api/toggleScrap";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";

const useToggleScrap = (category: Category, post_id: string) => {
  return useMutation({
    mutationFn: () => toggleScrap(category, post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post(category, post_id) });
    }
  })
};

export { useToggleScrap };