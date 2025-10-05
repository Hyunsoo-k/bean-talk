import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";

import queryKeys from "@/query-keys";

const useLogout = () => {
  const [, , removeCookie] = useCookies(["accessToken"]);
  const queryClient = useQueryClient();

  return () => {
    removeCookie("accessToken"); 
    queryClient.setQueryData(queryKeys.userMe(), null); 
  }
};

export default useLogout;