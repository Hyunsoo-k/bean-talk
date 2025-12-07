import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import { axiosInstance } from "@/services";
import { QUERY_KEYS } from "@/constants";

const mutationFn = async (
  category: Category,
  post_id: string,
  requestBody: Record<"content", string>
) => {
  const response = await axiosInstance.post(
    `/categories/${category}/posts/${post_id}/comments`,
    requestBody
  );

  return response.data;
};

const useCreateComment = (
  category: Category,
  post_id: string,
  reset,
  setIsInputFocused
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => mutationFn(
      category,
      post_id,
      requestBody
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(category, post_id) });
      reset();
      setIsInputFocused(false);
    },
  })
};

export { useCreateComment };