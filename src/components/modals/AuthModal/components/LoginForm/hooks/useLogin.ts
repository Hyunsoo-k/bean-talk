import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import type { LoginFormValues } from "@/types/loginFormValues";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { login } from "@/api/login";

const useLogin = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);

  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();

  return useMutation({
    mutationFn: (requestBody: LoginFormValues) => login(requestBody),
    onSuccess: async (data: Record<"accessToken", string>) => {
      const { accessToken } = data;
      setCookie("accessToken", accessToken);

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userMe });

      navigate("/");
    },
    onError: (error: AxiosError<Record<string, string>>) => {
      const { message } = error.response!.data;
      openAlertModal(message, closeAlertModal);
    },
  });
};

export { useLogin };
