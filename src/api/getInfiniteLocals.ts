import { axiosInstance } from "@/services/axiosInstance";

const getInfiniteLocals = async (query: string, page: number = 1) => {
  const response = await axiosInstance.get("/locals", {
    params: { query, page }
  });

  return response.data;
};

export { getInfiniteLocals };