import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { checkNotification } from "@/api/checkNotification";

const useCheckNotification = (notification_id: string) => {
  return useMutation({
    mutationFn: () => checkNotification(notification_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications })
    },
    onError: () => {},
  });
};

export { useCheckNotification };