import { useMutation } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";
import { deleteComment } from "@/api/deleteComment";

const useDeleteComment = (
  category: Category,
  post_id: string,
  comment_id: string
) => {
  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();
  const { close: closeFullPageSpinner } = useFullPageSpinnerStore();

  return useMutation({
    mutationFn: () => deleteComment(category, post_id, comment_id),
    onSuccess: () => {
      closeFullPageSpinner();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id)});
    },
    onError: () => {
      openAlertModal(
        "댓글 삭제에 실패하였습니다.",
        () => {
          closeFullPageSpinner();
          closeAlertModal();
        }
      );
    }
  });
};

export { useDeleteComment };