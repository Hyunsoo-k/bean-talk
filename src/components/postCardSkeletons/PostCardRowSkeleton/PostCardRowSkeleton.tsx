import styles from "./PostCardRowSkeleton.module.scss";

const PostCardRowSkeleton = () => {
  return (
    <div className={styles["post-card-row-skeleton-component"]}>
      <div className={styles["header"]}>
        <div className={styles["author"]} />
      </div>
      <div className={styles["body"]}>
        <div className={styles["text"]}>
          <div className={styles["title"]} />
          <div className={`${styles["content"]} ${styles["--first-line"]}`} />
          <div className={`${styles["content"]} ${styles["--second-line"]}`} />
        </div>
        <div className={styles["thumbnail"]} />
      </div>
      <div className={styles["footer"]}>
        <div className={styles["meta-stats"]} />
      </div>
    </div>
  );
};

export { PostCardRowSkeleton };