import { axiosInstance } from "@/services";

import type { LoginFormValue } from "@/types";

const login = async (requestBody: LoginFormValue) => {
  const response = await axiosInstance.post("/auth/login", requestBody);

  return response.data;
};

export { login };