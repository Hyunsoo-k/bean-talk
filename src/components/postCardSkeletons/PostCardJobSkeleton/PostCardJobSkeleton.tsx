import styles from "./PostCardJobSkeleton.module.scss";

const PostCardJobSkeleton = () => {
  return (
    <div className={styles["post-card-job-skeleton-component"]}>
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <div className={styles["author"]} />
        </div>
        <div className={styles["body"]}>
          <div className={styles["title"]} />
          <div className={styles["detail"]}>
            <div className={`${styles["content"]} ${styles["--first-line"]}`} />
            <div className={`${styles["content"]} ${styles["--second-line"]}`} />
            <div className={`${styles["content"]} ${styles["--third-line"]}`} />
            <div className={`${styles["content"]} ${styles["--fourth-line"]}`} />
          </div>
        </div>
      </div>
      <div className={styles["thumbnail"]} />
    </div>
  );
};

export { PostCardJobSkeleton };