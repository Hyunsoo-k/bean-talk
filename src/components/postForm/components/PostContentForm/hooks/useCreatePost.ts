import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"

import type { Category } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createPostDetail } from "@/api/createPostDetail";

const useCreatePost = (category: Category) => {
  const navigate = useNavigate();
  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();
  const { close: closeFullPageSpinner } = useFullPageSpinnerStore();

  return useMutation({
    mutationFn: (requestBody: PostRequestBody<typeof category>) => createPostDetail(category, requestBody),
    onSuccess: () => {
      navigate(`/categories/${category}/posts`);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts(category) });
    },
    onError: () => {
      openAlertModal(
        "게시글 작성을 실패하였습니다.",
        () => {
          closeAlertModal();
          closeFullPageSpinner();
        }
      );
    }
  });
};

export { useCreatePost };