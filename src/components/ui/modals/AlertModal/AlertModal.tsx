import type { JSX } from "react";
import { createPortal } from "react-dom";

import { useAlertModal } from "@/zustand";

import styles from "./AlertModal.module.scss";

const AlertModal = (): JSX.Element => {
  const {
    message,
    handleClick,
    close
  } = useAlertModal();

  const handleClickBackdrop = (): void => {
    close();
  };

  return createPortal(
    <>
      <div
        onClick={handleClickBackdrop}
        className={styles["backdrop"]}
      />
      <div className={styles["alert-modal-component"]}>
        <div className={styles["body"]}>
          <span className={styles["message"]}>
            {message}
          </span>
        </div>
        <div className={styles["footer"]}>
          <button type="button" onClick={handleClick}>
            확인
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export { AlertModal };
