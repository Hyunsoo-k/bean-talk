import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { QUERY_KEYS } from "@/constants";
import { getNotifications } from "@/api";

const useGetNotifications = () => {
  const [cookies] = useCookies(["accessToken"]);
  const hasToken = !!cookies.accessToken;

  return useQuery({
    queryKey: QUERY_KEYS.notifications,
    queryFn: getNotifications,
    enabled: !!hasToken
  });
};

export { useGetNotifications };