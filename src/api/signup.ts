import type { SignupFormValue } from "@/types/singupFormValue";
import { axiosInstance } from "@/services/axiosInstance";

const signup = async (requestBody: SignupFormValue) => {
  const response = await axiosInstance.post("/auth/signup", requestBody);

  return response.data;
};

export { signup };