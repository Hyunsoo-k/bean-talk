import type { JSX } from "react";

import styles from "./JobDetailFormField.module.scss";

const JobDetailFormField = (): JSX.Element => {
  return (
    <div className={styles["job-detail-form-field"]}></div>
  );
};

export { JobDetailFormField };