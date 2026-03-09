import { useCookies } from "react-cookie";

import { QUERY_KEYS } from "@/constants";
import { queryClient } from "@/constants/queryClient";

const useLogout = () => {
  const [, , removeCookie] = useCookies(["accessToken"]);

  return () => {
    removeCookie("accessToken"); 
    queryClient.setQueryData(QUERY_KEYS.userMe, null); 
  };
};

export { useLogout };