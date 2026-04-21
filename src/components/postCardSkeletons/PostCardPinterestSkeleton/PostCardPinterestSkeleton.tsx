import styles from "./PostCardPinterestSkeleton.module.scss";

const PostCardPinterestSkeleton = () => {
  return (
    <div className={styles["post-card-pinterest-skeleton"]}>
      <div className={styles["thumbnail"]} />
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <div className={styles["title"]} />
        </div>
        <div className={styles["body"]}>
          <div className={styles["content"]} />
          <div className={styles["content"]} />
        </div>
        <div className={styles["footer"]}>
          <div className={styles["author"]} />
        </div>
      </div>
    </div>
  );
};

export { PostCardPinterestSkeleton };