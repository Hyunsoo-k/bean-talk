import type { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createReply } from "@/api/createReply";

const useCreateReply = (
  category: Category,
  post_id: string,
  comment_id: string,
  setIsReplyFormOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => createReply(
      category,
      post_id,
      comment_id,
      requestBody
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      setIsReplyFormOpen(false);
    },
  });
};

export { useCreateReply };