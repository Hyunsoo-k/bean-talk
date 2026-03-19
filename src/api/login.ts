import type { LoginFormValue } from "@/types/loginFormValue";
import { axiosInstance } from "@/services/axiosInstance";

const login = async (requestBody: LoginFormValue) => {
  const response = await axiosInstance.post("/auth/login", requestBody);

  return response.data;
};

export { login };