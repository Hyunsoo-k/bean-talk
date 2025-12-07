import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import type { LoginFormValue } from "../types";
import { QUERY_KEYS } from "@/constants";
import { queryClient } from "@/constants/queryClient";
import { axiosInstance } from "@/services";
import { useAlertModal, useAuthModal } from "@/zustand";

const mutationFn = async (requestBody: LoginFormValue) => {
  const response = await axiosInstance.post("/auth/login", requestBody);

  return response.data;
};

const useLogin = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);

  const { open: openAlertModal, close: closeAlertModal } = useAlertModal();

  const { close: closeAuthModal } = useAuthModal();

  return useMutation({
    mutationFn: (requestBody: LoginFormValue) => mutationFn(requestBody),
    onSuccess: async (data: Record<"accessToken", string>) => {
      const { accessToken } = data;
      setCookie("accessToken", accessToken);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userMe });

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
