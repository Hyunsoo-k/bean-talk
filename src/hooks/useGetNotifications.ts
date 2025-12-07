import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { axiosInstance } from "@/services";
import { QUERY_KEYS } from "@/constants";

const queryFn = async () => {
  const response = await axiosInstance.get("/users/me/notifications");

  return response.data;
};

const useGetNotifications = () => {
  const [cookies] = useCookies(["accessToken"]);
  const hasToken = !!cookies.accessToken;

  return useQuery({
    queryKey: QUERY_KEYS.notifications,
    queryFn,
    enabled: !!hasToken
  });
};

export { useGetNotifications };