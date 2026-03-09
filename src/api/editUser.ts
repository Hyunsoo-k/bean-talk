import { axiosInstance } from "@/services";

import type { EditUserRequestBody } from "@/types";

const editUser = async (requestBody: EditUserRequestBody) => {
  const response = await axiosInstance.patch("/me/", requestBody);

  return response.data;
};

export { editUser };