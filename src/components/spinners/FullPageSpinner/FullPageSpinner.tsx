import type { JSX } from "react";
import { BeatLoader } from "react-spinners";

import styles from "./FullPageSpinner.module.scss";

const FullPageSpinner = (): JSX.Element => {
  return (
    <div className={styles["full-page-spinner-component"]}>
      <BeatLoader size={18} color="rgb(44, 44, 44)" />
    </div>
  );
};

export { FullPageSpinner };