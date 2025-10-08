import type { Dispatch, SetStateAction } from "react";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import type { SignupFormValue } from "@/types/auth-type";
import instance from "@/axios/instance";
import useAlertModalStore from "@/zustand/use-alert-modal-store";

const mutationFn = async (requestBody: SignupFormValue) => {
  const response = await instance.post("/auth/signup", requestBody);

  return response.data;
};

const useSignupMutation = (setFormType: Dispatch<SetStateAction<"login" | "signup">>) => {
  const { setIsOpen, setTitle, setMessage, setHandleClick, resetStore } = useAlertModalStore();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      setTitle("계정 생성 완료");
      setMessage("회원가입이 성공적으로 되었습니다");
      setIsOpen(true);
      setHandleClick(() => {
        setFormType("login");
        resetStore();
      });
    },
    onError: (error: AxiosError<Record<string, string>>) => {
      const { message } = error.response!.data;
      setTitle("회원가입 실패");
      setMessage(message);
      setIsOpen(true);
      setHandleClick(() => {
        setIsOpen(false);
        resetStore();
      });
    },
  });
};

export default useSignupMutation;
