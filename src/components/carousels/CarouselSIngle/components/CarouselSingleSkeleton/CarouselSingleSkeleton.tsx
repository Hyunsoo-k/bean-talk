import { CarouselSingleItemSkeleton } from "@/components/carouselSkeletons/CarouselSingleSkeleton/components/CarouselSingleItemSkeleton/CarouselSingleItemSkeleton";

import styles from "./CarouselSingleSkeleton.module.scss";

const CarouselSingleSkeleton = () => {
  return (
    <div className={styles["carousel-single-component"]}>
      <CarouselSingleItemSkeleton />
    </div>
  );
};

export { CarouselSingleSkeleton };