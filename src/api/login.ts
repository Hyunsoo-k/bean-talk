import type { LoginFormValues } from "@/types/loginFormValues";
import { axiosInstance } from "@/services/axiosInstance";

const login = async (loginFormValues: LoginFormValues) => {
  const response = await axiosInstance.post("/auth/login", loginFormValues);

  return response.data;
};

export { login };