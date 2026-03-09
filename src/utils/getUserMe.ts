import type { UserMe } from "@/types";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants";

const getUserMe = (): UserMe | null => {
  const userMe = queryClient.getQueryData<UserMe>(QUERY_KEYS.userMe );

  return userMe || null;
};

export { getUserMe }