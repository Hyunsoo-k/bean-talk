import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { axiosInstance } from "@/services/axiosInstance";
import { QUERY_KEYS } from "@/constants";

const queryFn = async () => {
  const response = await axiosInstance.get("/users/me");

  return response.data;
};

const useGetUserMe = () => {
  const [cookies] = useCookies(["accessToken"]);
  const hasToken = !!cookies.accessToken;

  return useQuery({
    queryKey: QUERY_KEYS.userMe,
    queryFn,
    enabled: hasToken
  });
};

export { useGetUserMe };
