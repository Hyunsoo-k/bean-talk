import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"

import type { Category } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { editPostDetail } from "@/api/editPostDetail";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";

const useEditPost = (category: Category, post_id: string) => {
  const navigate = useNavigate();

  const { open: openAlertModal,close: closeAlertModel } = useAlertModalStore();
  const { close: closeFullPageSpinner } = useFullPageSpinnerStore();

  return useMutation({
    mutationFn: (requestBody: PostRequestBody<typeof category>) =>
      editPostDetail(category, post_id, requestBody),
    onSuccess: () => {
      navigate(`/categories/${category}/posts`);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts(category) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post(category, post_id) });
    },
    onError: () => {
      openAlertModal(
        "게시글 작성을 실패하였습니다.",
        () => {
          closeFullPageSpinner();
          closeAlertModel();
        }
      );
    },
  });
};

export { useEditPost };