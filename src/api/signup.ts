import type { SignupFormValue } from "@/types";
import { axiosInstance } from "@/services";

const signup = async (requestBody: SignupFormValue) => {
  const response = await axiosInstance.post("/auth/signup", requestBody);

  return response.data;
};

export { signup };