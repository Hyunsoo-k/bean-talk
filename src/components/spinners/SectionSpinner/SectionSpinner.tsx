import type { JSX } from "react";
import { BeatLoader } from "react-spinners";

import styles from "./SectionSpinner.module.scss";

const SectionSpinner = (): JSX.Element => {
  return (
    <div className={styles["section-spinner-component"]}>
      <BeatLoader size={13} color="rgb(44, 44, 44)" />
    </div>
  );
};

export { SectionSpinner };