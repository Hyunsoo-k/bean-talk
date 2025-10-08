import type { JSX } from "react";

import styles from "./index.module.scss";

const Notification = (): JSX.Element => {
  return (
    <div className={styles["notification-component"]}></div>
  );
};

export default Notification;