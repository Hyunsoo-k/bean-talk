import { useMutation } from "@tanstack/react-query"
import type { Dispatch, SetStateAction } from "react";

import type { Category } from "@/types";
import { axiosInstance } from "@/services";
import { QUERY_KEYS } from "@/constants";
import { queryClient } from "@/constants/queryClient";

const mutationFn = async (
  category: Category,
  post_id: string,
  comment_id: string,
  reply_id: string,
  requestBody: Record<"content", string>
) => {
  const response = await axiosInstance.patch(
    `/categories/${category}/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`,
    requestBody
  );

  return response.data;
};

const useEditReply = (
  category: Category,
  post_id: string,
  comment_id: string,
  reply_id: string,
  setMode: Dispatch<SetStateAction<"replyItem" | "replyEditForm">>
) => {
  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => mutationFn(
      category,
      post_id,
      comment_id,
      reply_id,
      requestBody
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      setMode("replyItem");
    },
    onError: () => {}
  });
};

export { useEditReply };