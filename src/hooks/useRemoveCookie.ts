import { Cookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants";

const cookies = new Cookies();

const useRemoveCookie = (key: string) => {
  const queryClient = useQueryClient();

  const remove = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.userMe });

    cookies.remove(key, { path: "/" });

    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userMe });
  };

  return remove;
};

export { useRemoveCookie };