import styles from "./CarouselSingleItemSkeleton.module.scss";

const CarouselSingleItemSkeleton = () => {
  return (
    <div className={styles["carousel-single-item-skeleton-component"]}>
      <div className={styles["title"]} />
      <div className={styles["content"]} />
    </div>
  );
};

export { CarouselSingleItemSkeleton };