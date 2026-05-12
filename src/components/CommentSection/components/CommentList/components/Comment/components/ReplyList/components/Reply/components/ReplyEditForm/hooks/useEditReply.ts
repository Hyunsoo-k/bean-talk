import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query"

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { editReply } from "@/api/editReply";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";

const useEditReply = (
  category: Category,
  post_id: string,
  comment_id: string,
  reply_id: string,
  setMode: Dispatch<SetStateAction<"view" | "edit">>
) => {
  const { open: AlertModal, close: closeAlertModal } = useAlertModalStore();
  const { close: closeFullPageSpinner } = useFullPageSpinnerStore();
  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => editReply(
      category,
      post_id,
      comment_id,
      reply_id,
      requestBody
    ),
    onSuccess: () => {
      closeFullPageSpinner();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      setMode("view");
    },
    onError: () => {
      AlertModal(
        "답글 수정에 실패하였습니다.",
        () => {
          closeFullPageSpinner();
          closeAlertModal();
        }
      )
    }
  });
};

export { useEditReply };