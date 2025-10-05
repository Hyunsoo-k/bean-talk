import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import queryKeys from "@/query-keys";
import instance from "@/axios/instance";

const queryFn = async () => {
  const response = await instance.get("/users/me");

  return response.data;
};

const useGetUserMeQuery = () => {
  const [cookies] = useCookies(["accessToken"]);
  const hasToken = !!cookies.accessToken;

  return useQuery({
    queryKey: queryKeys.userMe(),
    queryFn,
    enabled: hasToken
  });
};

export default useGetUserMeQuery;
