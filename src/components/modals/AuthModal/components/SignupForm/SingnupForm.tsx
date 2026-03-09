import type { Dispatch, JSX, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import type { SignupFormValue } from "@/types";
import { useSignup } from "./hooks";

import styles from "./SignupForm.module.scss";

type Props = {
  setFormType: Dispatch<SetStateAction<"login" | "signup">>;
};

const SignupForm = ({ setFormType }: Props): JSX.Element => {
  const {
    register,
    formState,
    handleSubmit
  } = useForm<SignupFormValue>({ mode: "onChange" });
  const { isPending, mutate: signup } = useSignup(setFormType);

  const submit = (formValue: SignupFormValue) => {
    if (!isPending) {
      signup(formValue as SignupFormValue);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles["signup-form-component"]}>
      <div className={styles["input-wrapper"]}>
        <TfiEmail size={20} color="rgb(148,163,184" />
        <input
          placeholder="E-mail"
          autoComplete="off"
          {...register("email", {
            required: "필수 값 입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
        />
        {formState.errors.email?.message && (
          <small className={styles["error-message"]}>{formState.errors.email?.message as string}</small>
        )}
      </div>
      <div className={styles["input-wrapper"]}>
        <MdOutlineDriveFileRenameOutline size={20} color="rgb(148,163,184" />
        <input
          placeholder="Nickname"
          autoComplete="off"
          {...register("nickname", {
            required: "필수 값 입니다.",
            minLength: {
              value: 2,
              message: "닉네임은 최소 2글자 이상이어야 합니다.",
            },
          })}
        />
        {formState.errors.nickname?.message && (
          <small className={styles["error-message"]}>{formState.errors.nickname?.message as string}</small>
        )}
      </div>
      <div className={styles["input-wrapper"]}>
        <RiLockPasswordLine size={20} color="rgb(148,163,184" />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...register("password", {
            required: "필수 값 입니다.",
            minLength: {
              value: 7,
              message: "비밀번호는 최소 7자 이상이어야 합니다.",
            },
          })}
        />
        {formState.errors.password?.message && (
          <small className={styles["error-message"]}>{formState.errors.password?.message as string}</small>
        )}
      </div>
      <div className={styles["input-wrapper"]}>
        <RiLockPasswordLine size={20} color="rgb(148,163,184" />
        <input
          type="password"
          placeholder="Check Password"
          autoComplete="off"
          {...register("checkPassword", {
            required: "필수 값 입니다.",
            validate: (value, allValues) => {
              return value === allValues.password || "비밀번호가 일치하지 않습니다.";
            },
          })}
        />
        {formState.errors.checkPassword?.message && (
          <small className={styles["error-message"]}>{formState.errors.checkPassword?.message as string}</small>
        )}
      </div>
      <button disabled={isPending}>
        SIGN UP
      </button>
    </form>
  );
};

export { SignupForm };
