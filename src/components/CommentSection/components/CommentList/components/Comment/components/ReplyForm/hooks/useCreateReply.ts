import type { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createReply } from "@/api/createReply";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";

const useCreateReply = (
  category: Category,
  post_id: string,
  comment_id: string,
  setIsReplyFormOpen: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();
  const { close: closeFullPageSpinner } = useFullPageSpinnerStore();

  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => createReply(
      category,
      post_id,
      comment_id,
      requestBody
    ),
    onSuccess: () => {
      closeFullPageSpinner();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      setIsReplyFormOpen(false);
    },
    onError: () => {
      openAlertModal(
        "답글 작성에 실패하였습니다.",
        () => {
          closeFullPageSpinner();
          closeAlertModal();
        }
      )
    }
  });
};

export { useCreateReply };