import type { JSX } from "react";

import styles from "./PostDetailSkeleton.module.scss";

const PostDetailSkeleton = (): JSX.Element => {
  return (
    <div className={styles["post-detail-skeleton-component"]}>
      
    </div>
  );
};

export { PostDetailSkeleton };