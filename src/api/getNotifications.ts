import { axiosInstance } from "@/services/axiosInstance";

const getNotifications = async () => {
  const response = await axiosInstance.get("/me/notifications");

  return response.data;
};

export { getNotifications };