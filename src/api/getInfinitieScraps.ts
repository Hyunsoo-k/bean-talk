import { axiosInstance } from "@/services";

const getInfinitieScraps = async (pageParam: string | null) => {
  const response = await axiosInstance.get(
    "/me/my-scraps",
    {
      params: pageParam ? { cursor: pageParam } : undefined,
    }
  );

  return response.data;
};

export { getInfinitieScraps };