import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import type { LoginFormValue } from "@/types/auth/auth-type";
import instance from "@/axios/instance";
import useAlertModalStore from "@/zustand/use-alert-modal-store";
import queryKeys from "@/query-keys";

const mutationFn = async (requestBody: LoginFormValue) => {
  const response = await instance.post("/auth/login", requestBody);

  return response.data;
};

const useLoginMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, setCookie] = useCookies(["accessToken"]);
  const { setIsOpen, setTitle, setMessage, setHandleClick, resetStore } = useAlertModalStore();

  return useMutation({
    mutationFn: (requestBody: LoginFormValue) => mutationFn(requestBody),
    onSuccess: (data: Record<"accessToken", string>) => {
      setCookie("accessToken", data.accessToken);
      queryClient.fetchQuery({ queryKey: queryKeys.userMe() });
      navigate("/");
    },
    onError: (error: AxiosError<Record<string, string>>) => {
      const { message } = error.response!.data;
      setTitle("로그인 실패");
      setMessage(message);
      setIsOpen(true);
      setHandleClick(() => {
        setIsOpen(false);
        resetStore();
      });
    },
  });
};

export default useLoginMutation;
