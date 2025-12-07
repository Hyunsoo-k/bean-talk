import type { Dispatch, SetStateAction } from "react";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import type { SignupFormValue } from "../types";
import { axiosInstance } from "@/services";
import { useAlertModal } from "@/zustand";

const mutationFn = async (requestBody: SignupFormValue) => {
  const response = await axiosInstance.post("/auth/signup", requestBody);

  return response.data;
};

const useSignup = (setFormType: Dispatch<SetStateAction<"login" | "signup">>) => {
  const {
    setIsOpen,
    setMessage,
    setHandleClick,
    resetStore
  } = useAlertModal();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      setMessage("회원가입이 성공적으로 완료되었습니다");
      setIsOpen(true);
      setHandleClick(() => {
        setFormType("login");
        resetStore();
      });
    },
    onError: (error: AxiosError<Record<string, string>>) => {
      const { message } = error.response!.data;
      setMessage(message);
      setIsOpen(true);
      setHandleClick(() => {
        setIsOpen(false);
        resetStore();
      });
    },
  });
};

export { useSignup };
