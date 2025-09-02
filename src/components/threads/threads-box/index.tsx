import type { JSX } from "react";

import styles from "./index.module.scss";
import ThreadsItem from "../threads-item";

const ThreadsBox = (): JSX.Element => {
  return (
    <ul className={styles["threads-box-component"]}>
      {[1, 2, 3].map(() => (
        <li className={styles["threads-item-wrapper"]}>
          <ThreadsItem />
        </li>
      ))}
    </ul>
  );
};

export default ThreadsBox;