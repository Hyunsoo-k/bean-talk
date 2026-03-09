import { axiosInstance } from "@/services";

const getNotifications = async () => {
  const response = await axiosInstance.get("/me/notifications");

  return response.data;
};

export { getNotifications };