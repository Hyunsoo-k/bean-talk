import styles from "./CarouselSingleItemSkeleton.module.scss";

const CarouselSingleItemSkeleton = () => {
  return (
    <div className={styles["carousel-single-item-skeleton-component"]}>
      <div className={styles["header"]}>
        <div className={styles["category"]} />
        <div className={styles["title"]} />
      </div>
      <div className={styles["body"]}>
        <div className={`${styles["content"]} ${styles["first-line"]}`} />
        <div className={`${styles["content"]} ${styles["second-line"]}`} />
      </div>
    </div>
  );
};

export { CarouselSingleItemSkeleton };