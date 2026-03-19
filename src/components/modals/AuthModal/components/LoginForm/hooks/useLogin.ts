import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import type { LoginFormValue } from "@/types/loginFormValue";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { login } from "@/api/login";

const useLogin = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);

  const {
    open: openAlertModal,
    close: closeAlertModal
  } = useAlertModalStore();

  const { close: closeAuthModal } = useAuthModalStore();

  return useMutation({
    mutationFn: (requestBody: LoginFormValue) => login(requestBody),
    onSuccess: async (data: Record<"accessToken", string>) => {
      const { accessToken } = data;
      setCookie("accessToken", accessToken);

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userMe });

      closeAuthModal();

      navigate("/");
    },
    onError: (error: AxiosError<Record<string, string>>) => {
      const { message } = error.response!.data;
      
      openAlertModal(message, closeAlertModal);
    },
  });
};

export { useLogin };
