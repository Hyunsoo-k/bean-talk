import { useMutation } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { deleteComment } from "@/api/deleteComment";

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