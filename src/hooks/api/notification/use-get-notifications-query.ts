import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import instance from "@/axios/instance";
import queryKeys from "@/query-keys";

const queryFn = async () => {
  const response = await instance.get("/users/me/notifications");

  return response.data;
};

const useGetNotificationsQuery = () => {
  const [cookies] = useCookies(["accessToken"]);
  const hasToken = !!cookies.accessToken;

  return useQuery({
    queryKey: queryKeys.notifications(),
    queryFn,
    enabled: !!hasToken
  });
};

export default useGetNotificationsQuery;