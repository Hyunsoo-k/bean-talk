import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { axiosInstance } from "@/services/axiosInstance"
import { useAlertModalStore } from "@/zustand/useAlertModalStore";

const mutationFn = async (category: Category, post_id: string) => {
  const response = await axiosInstance.delete(`/categories/${category}/posts/${post_id}`);

  return response.data;
};

const useDeletePost = (category: Category, post_id: string) => {
  const navigate = useNavigate();
  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();

  return useMutation({
    mutationFn: () => mutationFn(category, post_id),
    onSuccess: () => {
      navigate(`/categories/${category}/posts`);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts(category) });
    },
    onError: () => {
      openAlertModal("게시글 작성을 실패하였습니다.", closeAlertModal);
    }
  });
};

export { useDeletePost };