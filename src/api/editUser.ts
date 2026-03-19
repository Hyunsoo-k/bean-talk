import { axiosInstance } from "@/services/axiosInstance";

import type { EditUserRequestBody } from "@/types/editUserRequestBody";

const editUser = async (requestBody: EditUserRequestBody) => {
  const response = await axiosInstance.patch("/me/", requestBody);

  return response.data;
};

export { editUser };