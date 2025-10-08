import type { JSX } from "react";
import { createPortal } from "react-dom";

import useAlertModalStore from "@/zustand/use-alert-modal-store";

import styles from "./index.module.scss";

const AlertModal = (): JSX.Element => {
  const { setIsOpen, title, message, handleClick } = useAlertModalStore();

  return createPortal(
    <>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={styles["backdrop"]}
      />
      <div className={styles["alert-modal-component"]}>
        <div className={styles["top"]}>
          <span>{title}</span>
        </div>
        <div className={styles["body"]}>
          <span>{message}</span>
        </div>
        <div className={styles["bottom"]}>
          <button type="button" onClick={handleClick}>
            확인
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default AlertModal;
