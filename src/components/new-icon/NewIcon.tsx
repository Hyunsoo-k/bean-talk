import type { JSX } from "react";

import styles from "./NewIcon.module.scss";

const NewIcon = (): JSX.Element => {
  return (
    <div className={styles["new-icon-component"]}>
      N
    </div>
  );
};

export { NewIcon };