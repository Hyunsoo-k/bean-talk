import type { Dispatch, SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createComment } from "@/api/createComment";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";

const useCreateComment = (
  category: Category,
  post_id: string,
  reset: UseFormReset<Record<"content", string>>,
  setIsInputFocused: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();
  const { close: closeFullPageSpinner } = useFullPageSpinnerStore();

  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => createComment(
      category,
      post_id,
      requestBody
    ),
    onSuccess: () => {
      closeFullPageSpinner();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      reset();
      setIsInputFocused(false);
    },
    onError: () => {
      openAlertModal(
        "댓글 작성을 실패하였습니다.",
        () => {
          closeFullPageSpinner();
          closeAlertModal();
        }
      )
    }
  })
};

export { useCreateComment };