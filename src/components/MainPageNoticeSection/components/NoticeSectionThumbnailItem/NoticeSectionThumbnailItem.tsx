import type { JSX } from "react";

import howToUseImage from "@/assets/images/how-to-use.png";
import styles from "./NoticeSectionThumbnailItem.module.scss";

const MarketTrendThumbnailItem = (): JSX.Element => {
  return (
    <div className={styles["notice-section-thumbnail-item-component"]}>
      <div className={styles["header"]}>
        <h2 className={styles["how-to-use"]}>
          HOW TO USE
        </h2>
        <h2 className={styles["title"]}>
          쉽게 알아보는 빈톡 커뮤니티 사용법
        </h2>
      </div>
      <div className={styles["body"]}>
        <div
          className={styles["thumbnail"]}
          style={{ backgroundImage: `url(${howToUseImage})`}}
        />
      </div>
    </div>
  );
};

export { MarketTrendThumbnailItem };