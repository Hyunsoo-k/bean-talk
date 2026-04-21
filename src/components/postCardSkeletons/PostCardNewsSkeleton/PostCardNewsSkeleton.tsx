import styles from "./PostCardNewsSkeleton.module.scss";

const PostCardNewsSkeleton = () => {
  return (
    <div className={styles["post-card-news-skeleton-component"]}>
      <div className={styles["thumbnail"]} />
      <header className={styles["header"]}>
        <div className={styles["meta-data"]}>
          <div className={styles["sub-category"]} />
          <div className={styles["created-at"]} />
        </div>
        <div className={`${styles["title"]} ${styles["first-line"]}`} />
        <div className={`${styles["title"]} ${styles["second-line"]}`} />
      </header>
      <div className={styles["body"]}>
        <div className={`${styles["content"]} ${styles["first-line"]}`} />
        <div className={`${styles["content"]} ${styles["second-line"]}`} />
      </div>
    </div>
  );
};

export { PostCardNewsSkeleton };