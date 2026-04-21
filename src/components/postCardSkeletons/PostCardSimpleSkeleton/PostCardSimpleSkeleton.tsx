import styles from "./PostCardSimpleSkeleton.module.scss";

type Props = {
  noStaticWidth?: boolean;
};

const PostCardSimpleSkeleton = ({ noStaticWidth }: Props) => {
  return (
    <div className={`${styles["post-card-simple-skeleton-component"]} ${noStaticWidth ? styles["no-static-width"] : ""}`}>
      <div className={styles["thumbnail"]} />
      <div className={styles["main"]}>
        <div className={styles["header"]} />
        <div className={styles["body"]}>
          <div className={`${styles["content"]} ${styles["first-line"]}`} />
          <div className={`${styles["content"]} ${styles["second-line"]}`} />
        </div>
        <div className={styles["footer"]} />
      </div>
    </div>
  );
};

export { PostCardSimpleSkeleton };