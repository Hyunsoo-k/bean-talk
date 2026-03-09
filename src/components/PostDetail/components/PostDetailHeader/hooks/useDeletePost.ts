import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import type { Category } from "@/types";
import { QUERY_KEYS } from "@/constants";
import { queryClient } from "@/constants/queryClient";
import { axiosInstance } from "@/services"

const mutationFn = async (category: Category, post_id: string) => {
  const response = await axiosInstance.delete(`/categories/${category}/posts/${post_id}`);

  return response.data;
};

const useDeletePost = (category: Category, post_id: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => mutationFn(category, post_id),
    onSuccess: () => {
      navigate(`/categories/${category}/posts`);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts(category) });
    },
    onError: () => {}
  });
};

export { useDeletePost };