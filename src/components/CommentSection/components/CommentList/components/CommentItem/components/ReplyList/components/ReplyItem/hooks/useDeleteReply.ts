import { useMutation } from "@tanstack/react-query"

import type { Category } from "@/types";
import { QUERY_KEYS } from "@/constants";
import { queryClient } from "@/constants/queryClient";
import { axiosInstance } from "@/services";
import { useAlertModalStore } from "@/zustand";

const mutationFn = async (
  category: Category,
  post_id: string,
  comment_id: string,
  reply_id: string
) => {
  const response = await axiosInstance.delete(`/categories/${category}/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`);

  return response.data;
};

const useDeleteReply = (
  category: Category,
  post_id: string,
  comment_id: string,
  reply_id: string
) => {
  const {
    open: openAlertModal,
    close: closeAlertModal
  } = useAlertModalStore();

  return useMutation({
    mutationFn: () => mutationFn(
      category,
      post_id,
      comment_id,
      reply_id
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
    },
    onError: (error: Error) => {
      openAlertModal(error.message, closeAlertModal);
    }
  });
};

export { useDeleteReply };