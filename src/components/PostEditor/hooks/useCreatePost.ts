import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"

import type { Category, PostRequestBody } from "@/types";
import { axiosInstance } from "@/services";
import { useAlertModal } from "@/zustand";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants";

const mutationFn = async (
  category: Category,
  requestBody: PostRequestBody<typeof category>
) => {
  const response = await axiosInstance.post(
    `/categories/${category}/posts`,
    requestBody
  );

  return response.data;
};

const useCreatePost = (category: Category) => {
  const navigate = useNavigate();

  const {
    setIsOpen,
    setMessage,
    setHandleClick,
    resetStore
  } = useAlertModal();

  return useMutation({
    mutationFn: (requestBody: PostRequestBody<typeof category>) => mutationFn(category, requestBody),
    onSuccess: () => {
      navigate(`/categories/${category}/posts`);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts(category) });
    },
    onError: () => {
      setMessage("게시글 작성을 실패하였습니다.");
      setIsOpen(true);
      setHandleClick(resetStore);
    }
  });
};

export { useCreatePost };