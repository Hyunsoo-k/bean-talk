import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { QUERY_KEYS } from "@/constants";
import { getUserMe } from "@/api";

const useGetUserMe = () => {
  const [cookies] = useCookies(["accessToken"]);
  const hasToken = !!cookies.accessToken;

  return useQuery({
    queryKey: QUERY_KEYS.userMe,
    queryFn: getUserMe,
    enabled: hasToken
  });
};

export { useGetUserMe };
