import { useMutation } from "@tanstack/react-query";

import type { EditUserRequestBody } from "@/types";
import { QUERY_KEYS, queryClient } from "@/constants";
import { editUser } from "@/api/editUser";
import { useAlertModalStore, useEditUserModalStore } from "@/zustand";

const useEditUser = () => {
  const {
    open: openAlertModal,
    close: closeAlertModal
  } = useAlertModalStore();

  const {
    close: closeEditUserModal
  } = useEditUserModalStore();

  return useMutation({
    mutationFn: (requestBody: EditUserRequestBody) => editUser(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userMe });

      openAlertModal(
        "회원 정보가 수정되었습니다.",
        () => {
          closeAlertModal(); 
          closeEditUserModal();
        }
      );
    },
    onError: (error) => {
      openAlertModal(
        error.response?.data?.message,
        closeAlertModal
      )
    }
  })
};

export { useEditUser };