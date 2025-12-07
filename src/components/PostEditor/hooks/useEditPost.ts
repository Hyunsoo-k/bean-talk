import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"

import type { Category, PostRequestBody } from "@/types";
import { axiosInstance } from "@/services";
import { useAlertModal } from "@/zustand";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants";

const mutationFn = async (
  category: Category,
  post_id: string,
  requestBody: PostRequestBody<typeof category>
) => {
  const response = await axiosInstance.patch(
    `/categories/${category}/posts/${post_id}`,
    requestBody
  );

  return response.data;
};

const useEditPost = (category: Category, post_id: string) => {
  const navigate = useNavigate();

  const {
    setIsOpen,
    setMessage,
    setHandleClick,
    resetStore
  } = useAlertModal();

  return useMutation({
    mutationFn: (requestBody: PostRequestBody<typeof category>) =>
      mutationFn(category, post_id, requestBody),
    onSuccess: () => {
      navigate(`/categories/${category}/posts`);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts(category) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.post(category, post_id) });
    },
    onError: () => {
      setIsOpen(true);
      setMessage("게시글 작성을 실패하였습니다.");
      setHandleClick(resetStore);
    },
  });
};

export { useEditPost };