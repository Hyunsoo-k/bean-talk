import { createPortal } from "react-dom";

import { useAlertModalStore } from "@/zustand/useAlertModalStore";

import styles from "./AlertModal.module.scss";

const AlertModal = () => {
  const {
    message,
    handleClick,
    close
  } = useAlertModalStore();

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
