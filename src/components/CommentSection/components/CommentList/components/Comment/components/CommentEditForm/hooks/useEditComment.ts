import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query"

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { editComment } from "@/api/editComment";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";

const useEditComment = (
  category: Category,
  post_id: string,
  comment_id: string,
  setMode: Dispatch<SetStateAction<"view" | "edit">>
) => {
  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();
  const { close: closeFullPageSpinner } = useFullPageSpinnerStore();
  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => editComment(
      category,
      post_id,
      comment_id,
      requestBody
    ),
    onSuccess: () => {
      closeFullPageSpinner();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      setMode("view");
    },
    onError: () => {
      openAlertModal(
        "댓글 수정에 실패하였습니다.",
        () => {
          closeAlertModal();
          closeFullPageSpinner();
        }
      )
    }
  });
};

export { useEditComment };