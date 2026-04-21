import { createPortal } from "react-dom";

import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";
import { useScrollLock } from "@/hooks/useScrollLock";

import styles from "./ConfrimModal.module.scss";

const ConfirmModal = ()=> {
  const {
    isOpen,
    message,
    subMessage,
    handleClickCancel,
    handleClickConfirm,
    close
  } = useConfirmModalStore();

  useScrollLock(isOpen);

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
          <span className={styles["sub-message"]}>
            {subMessage}
          </span>
        </div>
        <footer className={styles["footer"]}>
          <button
            type="button"
            onClick={handleClickCancel}
            className={`${styles["button"]} ${styles["cancel"]}`}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleClickConfirm}
            className={`${styles["button"]} ${styles["confirm"]}`}
          >
            확인
          </button>
        </footer>
      </div>
    </>,
    document.body
  );
};

export { ConfirmModal };