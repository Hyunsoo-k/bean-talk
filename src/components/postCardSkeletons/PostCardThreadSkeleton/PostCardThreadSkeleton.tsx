import styles from "./PostCardThreadSkeleton.module.scss";

const PostCardThreadSkeleton = () => {
  return (
    <div className={styles["post-card-thread-skeleton-component"]}>
      <div className={styles["header"]}>
        <div className={styles["profile-image"]} />
        <div className={styles["author"]} />
      </div>
      <div className={styles["body"]}>
        <div className={`${styles["content"]} ${styles["--first-line"]}`} />
        <div className={`${styles["content"]} ${styles["--second-line"]}`} />
      </div>
      <div className={styles["footer"]}>
        <div className={styles["meta-stats"]} />
      </div>
    </div>
  );
};

export { PostCardThreadSkeleton };