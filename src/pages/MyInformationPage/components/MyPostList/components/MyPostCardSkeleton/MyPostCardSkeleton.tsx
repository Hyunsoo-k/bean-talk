import styles from "./MyPostCardSkeleton.module.scss";

const MyPostCardSkeleton = () => {
  return (
    <div className={styles["my-post-card-skeleton-component"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]} />
      </div>
      <div className={styles["body"]}>
        <div className={`${styles["content"]} ${styles["--first-line"]}`} />
        <div className={`${styles["content"]} ${styles["--second-line"]}`} />
      </div>
      <div className={styles["footer"]}>
        <div className={styles["created-at"]} />
      </div>
    </div>
  );
};

export { MyPostCardSkeleton };