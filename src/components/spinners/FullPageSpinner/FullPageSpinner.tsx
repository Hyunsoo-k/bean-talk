import { createPortal } from "react-dom";
import { BeatLoader } from "react-spinners";

import { useScrollLock } from "@/hooks/useScrollLock";

import styles from "./FullPageSpinner.module.scss";

const FullPageSpinner = () => {
  useScrollLock(true);

  return createPortal(
    <div className={styles["full-page-spinner-component"]}>
      <BeatLoader className={styles["icon"]} />
    </div>,
    document.body
  );
};

export { FullPageSpinner };