import { useCookies } from "react-cookie";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";

const useLogout = () => {
  const [, , removeCookie] = useCookies(["accessToken"]);

  return () => {
    removeCookie("accessToken"); 
    queryClient.setQueryData(QUERY_KEYS.userMe, null); 
  };
};

export { useLogout };