import type { JSX } from "react";
import { createPortal } from "react-dom";

import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";

import styles from "./ConfrimModal.module.scss";

const ConfirmModal = (): JSX.Element => {
  const {
    message,
    handleClickCancel,
    handleClickConfirm,
    close
  } = useConfirmModalStore();

  const handleClickBackdrop = (): void => {
    close();
  };

  return createPortal(
    <>
      <div
        onClick={handleClickBackdrop}
        className={styles["backdrop"]}
      />
      <div className={styles["confirm-modal-component"]}>
        <div className={styles["body"]}>
          <span className={styles["message"]}>
            {message}
          </span>
        </div>
        <div className={styles["footer"]}>
          <button
            type="button"
            onClick={handleClickCancel}
            className={styles["cancel-button"]}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleClickConfirm}
            className={styles["confirm-button"]}
          >
            확인
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export { ConfirmModal };