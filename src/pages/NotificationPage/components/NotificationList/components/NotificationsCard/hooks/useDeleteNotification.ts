import { useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants";
import { queryClient } from "@/constants/queryClient";
import { deleteNotification } from "@/api/deleteNotification";

const useDeleteNotification = (notification_id: string) => {
  return useMutation({
    mutationFn: () => deleteNotification(notification_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications });
    },
    onError: () => {}
  });
};

export { useDeleteNotification };