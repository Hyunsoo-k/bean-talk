import type { JSX } from "react";

import ThreadsItem from "@/components/threads/threads-item";

import styles from "./index.module.scss";

const ThreadsItemBox= (): JSX.Element => {
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

export default ThreadsItemBox;