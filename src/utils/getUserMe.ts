import type { UserMe } from "@/types/userMe";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";

const getUserMe = (): UserMe | null => {
  const userMe = queryClient.getQueryData<UserMe>(QUERY_KEYS.userMe );

  return userMe || null;
};

export { getUserMe }