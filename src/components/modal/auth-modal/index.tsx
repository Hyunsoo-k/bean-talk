import type { JSX } from "react";
import {
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

import useLoginModal from "@/zustand/use-auth-modal-store";
import LoginForm from "@/components/modal/auth-modal/internals/login-form";
import SignupForm from "@/components/modal/auth-modal/internals/signup-form";

import styles from "./index.module.scss";

const AuthModal = (): JSX.Element => {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const { setIsOpen: setIsLoginModalOpen } = useLoginModal();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClickMode = (formType: "login" | "signup") => {
    setFormType(formType);
  };

  return createPortal(
    <>
      <div
        onClick={() => {
          setIsLoginModalOpen(false);
        }}
        className={styles["backdrop"]}
      />
      <div className={styles["auth-modal-component"]}>
        <div className={styles["header"]}>
          <button
            type="button"
            onClick={() => {
              handleClickMode("login");
            }}
            className={`${formType === "login" ? styles["--active"] : ""}`}
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => {
              handleClickMode("signup");
            }}
            className={`${formType === "signup" ? styles["--active"] : ""}`}
          >
            SIGN UP
          </button>
        </div>
        {formType === "login"
          ? <LoginForm />
          : <SignupForm setFormType={setFormType} />
        }
      </div>
    </>,
    document.body
  );
};

export default AuthModal;
