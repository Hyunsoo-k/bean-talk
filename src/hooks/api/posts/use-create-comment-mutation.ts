import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import instance from "@/axios/instance";
import queryKeys from "@/query-keys";

const mutationFn = async (
  category: Category,
  post_id: string,
  requestBody: Record<"content", string>
) => {
  const response = await instance.post(
    `/bbs/categories/${category}/posts/${post_id}/comments`,
    requestBody
  );

  return response.data;
};

const useCreateCommentMutation = (
  category: Category,
  post_id: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: Record<"content", string>) => mutationFn(
      category,
      post_id,
      requestBody
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.post(post_id) })
    },
  })
};

export default useCreateCommentMutation;