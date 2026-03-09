import { useEffect } from "react";
import { createPortal } from "react-dom"
import { FormProvider, useForm } from "react-hook-form";

import type { EditUserRequestBody, UserMe } from "@/types";
import type { EditUserFormValues } from "./types";
import { QUERY_KEYS, queryClient } from "@/constants";
import { useEditUserModalStore } from "@/zustand";
import { uploadImageSrc } from "@/api";
import { useEditUser } from "./hooks";
import { EditUserForm } from "./components/EditUserForm";

import styles from "./EditUserModal.module.scss";

const EditUserModal = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const userMe: UserMe | undefined = queryClient.getQueryData(QUERY_KEYS.userMe);

  const { close: closeEditUserModal } = useEditUserModalStore();

  const {
    mutate: editUser,
    isPending
  } = useEditUser();

  const formTools = useForm<EditUserFormValues>({
    mode: "onChange",
    defaultValues: {
      profileImageUrl: userMe?.profileImageUrl,
      nickname: userMe?.nickname,
      email: userMe?.email,
      password: "",
      checkPassword: ""
    }
  });

  const handleSubmit = async (formValue: EditUserFormValues) => {
    const {
      profileImageUrl,
      nickname,
      password,
    } = formValue;

    let finalProfileImageUrl = profileImageUrl;

    if (profileImageUrl && profileImageUrl !== userMe?.profileImageUrl) {
      finalProfileImageUrl = await uploadImageSrc(profileImageUrl);
    }

    const requestBody: EditUserRequestBody = {
      profileImageUrl: finalProfileImageUrl,
      nickname,
      password
    };

    editUser(requestBody);
  };

  const handleSubmitError = async () => {

  };

  return createPortal(
    <>
      <div
        onClick={closeEditUserModal}
        className={styles["backdrop"]}
      />
      <div className={styles["edit-user-modal-component"]}>
        <div className={styles["header"]}>
          <p className={styles["title"]}>
            내 정보 수정
          </p>
        </div>
        <FormProvider {...formTools}>
          <EditUserForm
            handleSubmit={handleSubmit}
            handleSubmitError={handleSubmitError}
            isPending={isPending}
          />
        </FormProvider>
      </div>
    </>,
    document.body
  );
};

export { EditUserModal };