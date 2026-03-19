import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query"

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { editReply } from "@/api/editReply";

const useEditReply = (
  category: Category,
  post_id: string,
  comment_id: string,
  reply_id: string,
  setMode: Dispatch<SetStateAction<"replyItem" | "replyEditForm">>
) => {
  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => editReply(
      category,
      post_id,
      comment_id,
      reply_id,
      requestBody
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      setMode("replyItem");
    },
    onError: () => {}
  });
};

export { useEditReply };