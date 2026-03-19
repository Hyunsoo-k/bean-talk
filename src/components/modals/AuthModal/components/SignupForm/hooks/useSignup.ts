import type { Dispatch, SetStateAction } from "react";
import type { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import type { SignupFormValue } from "@/types/singupFormValue";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { signup } from "@/api/signup";

const useSignup = (setFormType: Dispatch<SetStateAction<"login" | "signup">>) => {
  const {
    open: OpenAlertModal,
    close: closeAlertModal
  } = useAlertModalStore();

  return useMutation({
    mutationFn: (requestBody: SignupFormValue) => signup(requestBody), 
    onSuccess: () => {
      OpenAlertModal(
        "회원가입이 성공적으로 완료되었습니다",
        () => {
          closeAlertModal();
          setFormType("login");
        }
      );
    },
    onError: (error: AxiosError<Record<string, string>>) => {
      const { message } = error.response!.data;

      OpenAlertModal(message, closeAlertModal);
    },
  });
};

export { useSignup };
