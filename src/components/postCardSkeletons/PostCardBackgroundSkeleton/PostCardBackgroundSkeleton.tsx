import type { JSX } from "react";

import styles from "./PostCardBackgroundSkeleton.module.scss";

const PostCardBackgroundSkeleton = (): JSX.Element => {
  return (
    <div className={styles["post-card-background-skeleton-component"]}>
      <div className={styles["header"]}>
        <div className={`${styles["title"]} ${styles["--first-line"]}`} />
        <div className={`${styles["title"]} ${styles["--second-line"]}`} />
      </div>
      <div className={styles["body"]}>
        <div className={`${styles["content"]} ${styles["--first-line"]}`} />
        <div className={`${styles["content"]} ${styles["--second-line"]}`} />
      </div>
      <div className={styles["footer"]}>
        <div className={styles["read-more-button"]}>
          Read more
        </div>
      </div>
    </div>
  );
};

export { PostCardBackgroundSkeleton };