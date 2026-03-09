import type { JSX } from "react";

import styles from "./PostCardColumnSkeleton.module.scss";
import { SlArrowRight } from "react-icons/sl";

const PostCardColumnSkeleton = (): JSX.Element => {
  return (
    <div className={styles["post-card-column-skeleton-component"]}>
      <div className={styles["image"]} />
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <div className={styles["author"]} />
          <div className={styles["title"]} />
        </div>
        <div className={styles["body"]}>
          <div className={`${styles["content"]} ${styles["--first-line"]}`} />
          <div className={`${styles["content"]} ${styles["--second-line"]}`} />
        </div>
        <div className={styles["footer"]}>
          <div className={styles["read-more-button"]}>
            Read more
            <SlArrowRight size={11} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostCardColumnSkeleton };