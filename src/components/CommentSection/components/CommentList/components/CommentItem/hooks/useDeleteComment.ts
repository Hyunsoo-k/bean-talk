import { useMutation } from "@tanstack/react-query";

import type { Category } from "@/types";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants";
import { useAlertModalStore } from "@/zustand";
import { deleteComment } from "@/api";

const useDeleteComment = (
  category: Category,
  post_id: string,
  comment_id: string
) => {
  const { open: openAlertModal, close } = useAlertModalStore();

  return useMutation({
    mutationFn: () => deleteComment(category, post_id, comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id)});
    },
    onError: (error: Error) => {
      openAlertModal(error.message, close);
    }
  });
};

export { useDeleteComment };