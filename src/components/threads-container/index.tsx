import type { JSX } from "react";

import Thread from "@/components/thread";

import styles from "./index.module.scss";

const ThreadsContainer = (): JSX.Element => {
  return (
    <ul className={styles["thread-container-component"]}>
      {[1, 2, 3].map((item: number) => (
        <li key={item} className={styles["thread-wrapper"]}>
          <Thread />
        </li>
      ))}
    </ul>
  );
};

export default ThreadsContainer;
