import { axiosInstance } from "@/services";

const getUserMe = async () => {
  const response = await axiosInstance.get("/me");

  return response.data;
};

export { getUserMe };