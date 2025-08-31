import { type JSX, useState, useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";

import useLoginModal from "@/zustand/useAuthModal";

import styles from "./index.module.scss";

const AuthModal = (): JSX.Element => {
  const { setIsOpen } = useLoginModal();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const modalRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleClickBackDrop = (e: globalThis.MouseEvent) => {
      if (!modalRef.current) return;
      const clickTarget = e.target as HTMLElement;

      if (!modalRef.current.contains(clickTarget)) setIsOpen(false);
    };

    document.addEventListener("click", handleClickBackDrop);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("click", handleClickBackDrop);
    };
  }, []);

  const handleClickMode = (
    e: MouseEvent<HTMLButtonElement>,
    mode: "login" | "signup"
  ) => {
    e.stopPropagation();
    setAuthMode(mode);
  };

  return createPortal(
    <>
      <div className={styles["backdrop"]} />
      <form ref={modalRef} className={styles["auth-modal-component"]}>
        <div className={styles["header"]}>
          <button
            type="button"
            onClick={(e) => { handleClickMode(e, "login"); }}
            className={`${authMode === "login" ? styles["--active"] : ""}`}
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={(e) => { handleClickMode(e, "signup"); }}
            className={`${authMode === "signup" ? styles["--active"] : ""}`}
          >
            SIGN UP
          </button>
        </div>
        <div className={styles["body"]}>
          {authMode === "login"
            ? (
              <>
                <div className={styles["input-wrapper"]}>
                  <TfiEmail size={20} color="rgb(148,163,184" />
                  <input
                    placeholder="E-mail"
                    autoComplete="off"
                  />
                </div>
                <div className={styles["input-wrapper"]}>
                  <RiLockPasswordLine size={20} color="rgb(148,163,184" />
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                  />
                </div>
                <div className={styles["checkbox-wrapper"]}>
                  <input type="checkbox"/>
                  <span>로그인 상태 유지</span>
                </div>
                <button>LOGIN</button>
              </>
            )
            : (
              <>
                <div className={styles["input-wrapper"]}>
                  <TfiEmail size={20} color="rgb(148,163,184" />
                  <input
                    placeholder="E-mail"
                    autoComplete="off"
                  />
                </div>
                <div className={styles["input-wrapper"]}>
                  <RiLockPasswordLine size={20} color="rgb(148,163,184" />
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                  />
                </div>
                <div className={styles["input-wrapper"]}>
                  <RiLockPasswordLine size={20} color="rgb(148,163,184" />
                  <input
                    type="password"
                    placeholder="Check Password"
                    autoComplete="off"
                  />
                </div>
                <button>SIGN UP</button>
              </>
            )}
        </div>
      </form>
    </>,
    document.body
  );
};

export default AuthModal;
