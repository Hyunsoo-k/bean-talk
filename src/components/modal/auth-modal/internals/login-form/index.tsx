import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";

import type { LoginFormValue } from "@/types/auth-type";
import useLoginMutation from "@/hooks/api/auth/use-login-mutation";

import styles from "./index.module.scss";

const LoginForm = (): JSX.Element => {
  const {
    register,
    formState,
    handleSubmit: handleRHFSubmit
  } = useForm<LoginFormValue>({ mode: "onChange" });
  
  const { isPending, mutate: LoginMutate } = useLoginMutation();

  const submit = (formValue: LoginFormValue) => {
    if (!isPending) {
      LoginMutate(formValue as LoginFormValue);
    }
  };

  return (
    <form onSubmit={handleRHFSubmit(submit)} className={styles["login-form-component"]}>
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
          <small className={styles["error-message"]}>
            {formState.errors.email?.message as string}
          </small>
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
          <small className={styles["error-message"]}>
            {formState.errors.password?.message as string}
          </small>
        )}
      </div>
      <div className={styles["checkbox-wrapper"]}>
        <input type="checkbox" />
        <span>
          로그인 상태 유지
        </span>
      </div>
      <button>
        LOGIN
      </button>
    </form>
  );
};

export default LoginForm;
