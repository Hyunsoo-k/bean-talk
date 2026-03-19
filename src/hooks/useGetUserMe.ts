import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { getUserMe } from "@/api/getUserMe";

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
