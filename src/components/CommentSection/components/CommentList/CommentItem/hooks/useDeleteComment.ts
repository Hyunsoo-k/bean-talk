import { useMutation } from "@tanstack/react-query";

import type { Category } from "@/types";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants";
import { axiosInstance } from "@/services"
import { useAlertModal } from "@/zustand";

const mutationFn = async (
  category: Category,
  post_id: string,
  comment_id: string
) => {
  const response = await axiosInstance.delete(`/categories/${category}/posts/${post_id}/comments/${comment_id}`);

  return response.data;
};

const useDeleteComment = (
  category: Category,
  post_id: string,
  comment_id: string
) => {
  const { open: openAlertModal, close } = useAlertModal();

  return useMutation({
    mutationFn: () => mutationFn(category, post_id, comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id)});
    },
    onError: (error: Error) => {
      openAlertModal(error.message, close);
    }
  });
};

export { useDeleteComment };