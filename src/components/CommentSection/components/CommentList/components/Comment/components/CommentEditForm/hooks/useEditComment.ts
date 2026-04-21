import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query"

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { editComment } from "@/api/editComment";

const useEditComment = (
  category: Category,
  post_id: string,
  comment_id: string,
  setMode: Dispatch<SetStateAction<"view" | "edit">>
) => {
  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => editComment(
      category,
      post_id,
      comment_id,
      requestBody
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      setMode("view");
    },
    onError: () => {}
  });
};

export { useEditComment };