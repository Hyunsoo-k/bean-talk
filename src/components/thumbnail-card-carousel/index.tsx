import ThumbnailCard from "@/components/thumbnail-card";

import styles from "./index.module.scss";

const ThumbnailCardCarousel = () => {
  return (
    <ul className={styles["thumbnail-card-carousel-component"]}>
      {[1, 2, 3, 4, 5].map(() => (
        <li className={styles["thumbnail-card-wrapper"]}>
          <ThumbnailCard />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailCardCarousel;