import { axiosInstance } from "@/services/axiosInstance";

const getInfiniteScraps = async (pageParam: string | null) => {
  const response = await axiosInstance.get(
    "/me/my-scraps",
    {
      params: pageParam ? { cursor: pageParam } : undefined,
    }
  );

  return response.data;
};

export { getInfiniteScraps };