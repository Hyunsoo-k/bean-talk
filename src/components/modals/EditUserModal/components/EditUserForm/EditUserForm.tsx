import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

import type { EditUserFormValues } from "../../types";
import defaultImage from "@/assets/default-images/default-profile.jpg"
import styles from "./EditUserForm.module.scss";

type Props = {
  handleSubmit: SubmitHandler<EditUserFormValues>;
  handleSubmitError: SubmitErrorHandler<EditUserFormValues>;
  isPending: boolean;
};

const EditUserForm = ({
  handleSubmit,
  handleSubmitError,
  isPending
}: Props) => {
  const {
    handleSubmit: handleRHFSubmit,
    register,
    watch,
    formState,
    setValue
  } = useFormContext<EditUserFormValues>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickImage = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);

    setValue("profileImageUrl", url, {
      shouldDirty: true
    });
  };

  const handleClickResetImage = () => {
    setValue("profileImageUrl", null);
  };

  return (
    <form
      onSubmit={handleRHFSubmit(handleSubmit, handleSubmitError)}
      className={styles["edit-user-form-component"]}
    >
      <div className={styles["image-area"]}>
        <img
          onClick={handleClickImage}
          src={watch("profileImageUrl") || defaultImage}
          className={styles["profile-image"]}
        />
        <button
          type="button"
          onClick={handleClickResetImage}
          className={styles["reset-image-button"]}
        >
          초기화
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChangeImage}
          className={styles["image-input"]}
        />
      </div>
      <div className={`${styles["text-area"]} ${styles["nickname"]}`}>
        <label className={styles["label"]}>
          닉네임
        </label>
        <input
          {...register(
            "nickname",
            {
              required: "필수 값 입니다.",
              validate: (value: string) => {
                return value.length < 2 || value.length > 7
                  ? "닉네임은 2자 이상 7자 이하여야 합니다."
                  : true;
              }
            }
          )}
          defaultValue={watch("nickname")}
          className={styles["text-input"]}
        />
        {formState.errors.nickname && (
          <small className={styles["error-message"]}>
            {formState.errors.nickname.message as string}
          </small>
        )}
      </div>
      <div className={`${styles["text-area"]} ${styles["email"]}`}>
        <label className={styles["label"]}>
          이메일
        </label>
        <input
          defaultValue={"beantalk@beantalk.com"}
          disabled
          className={`${styles["text-input"]} ${styles["email-input"]}`}
        />
      </div>
      <div className={`${styles["text-area"]} ${styles["password"]}`}>
        <label className={styles["label"]}>
          새 비밀번호
        </label>
        <input
          {...register(
            "password",
            {
              required: "필수 값 입니다.",
              minLength: {
                value: 7,
                message: "비밀번호는 최소 7자 이상이어야 합니다.",
              },
            }
          )}
          type="password"
          className={styles["text-input"]}
        />
        {formState.errors.password && (
          <small className={styles["error-message"]}>
            {formState.errors.password.message as string}
          </small>
        )}
      </div>
      <div className={`${styles["text-area"]} ${styles["check-password"]}`}>
        <label className={styles["label"]}>
          비밀번호 확인
        </label>
        <input
          {...register(
            "checkPassword",
            {
              required: "필수 값 입니다.",
              validate: (value: string) => {
                return value === watch("password") || "비밀번호가 일치하지 않습니다."
              }
            }
          )}
          type="password"
          className={styles["text-input"]}
        />
        {formState.errors.checkPassword && (
          <small className={styles["error-message"]}>
            {formState.errors.checkPassword.message as string}
          </small>
        )}
      </div>
      <div className={styles["button-area"]}>
        <button disabled={isPending} className={styles["submit-button"]}>
          저장하기
        </button>
      </div>
    </form>
  );
};

export { EditUserForm };