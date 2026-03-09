import type { Dispatch, SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants";
import { createComment } from "@/api";

const useCreateComment = (
  category: Category,
  post_id: string,
  reset: UseFormReset<Record<"content", string>>,
  setIsInputFocused: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => createComment(
      category,
      post_id,
      requestBody
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      reset();
      setIsInputFocused(false);
    },
  })
};

export { useCreateComment };