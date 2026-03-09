import { axiosInstance } from "@/services";

const checkNotification = async (notification_id: string) => {
  const response = await axiosInstance.patch(`/me/notifications/${notification_id}`);

  return response.data
};

export { checkNotification };