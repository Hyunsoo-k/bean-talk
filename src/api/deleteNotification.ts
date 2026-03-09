import { axiosInstance } from "@/services";

const deleteNotification = async (notification_id: string) => {
  const response = await axiosInstance.delete(`/me/notifications/${notification_id}`);

  return response.data;
};

export { deleteNotification }