import { Cookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants";

const cookies = new Cookies();

const setCookie = (key: string, value: string, options?: any) => {
  return cookies.set(key, value, { ...options });
};

const getCookie = (key: string) => {
  return cookies.get(key);
};

const useRemoveCookie = (key: string) => {
  const queryClient = useQueryClient();

  const remove = () => {
    queryClient.removeQueries({ queryKey: QUERY_KEYS.userMe });

    cookies.remove(key, { path: "/" });

    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userMe });
  };

  return remove;
};

export { setCookie, getCookie, useRemoveCookie };
