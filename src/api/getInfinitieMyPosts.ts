import { axiosInstance } from "@/services";

const getInfinitieMyPosts = async (pageParam: string | null) => {
  const response = await axiosInstance.get(
    "/me/my-posts",
    {
      params: pageParam ? { cursor: pageParam } : undefined,
    }
  );

  return response.data;
};

export { getInfinitieMyPosts };