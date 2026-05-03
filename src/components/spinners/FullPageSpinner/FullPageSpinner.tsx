import { BeatLoader } from "react-spinners";

import styles from "./FullPageSpinner.module.scss";

const FullPageSpinner = () => {
  return (
    <div className={styles["full-page-spinner-component"]}>
      <BeatLoader className={styles["icon"]} />
    </div>
  );
};

export { FullPageSpinner };