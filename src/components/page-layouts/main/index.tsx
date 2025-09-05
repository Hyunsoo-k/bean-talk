import type { JSX } from "react";
import { BsFillThreadsFill } from "react-icons/bs";
import { TbSpeakerphone } from "react-icons/tb";

import ThumbnailCarouselBox from "@/components/thumbnail/thumbnail-carousel-box";
import ThreadsItemBox from "@/components/threads/threads-item-box";

import styles from "./index.module.scss";

const MainPageLayout = (): JSX.Element => {
  return (
    <div className={styles["main-page-layout-component"]}>
      <div className={styles["news-carousel-wrapper"]}>
        <ThumbnailCarouselBox thumbnailItemType="column" />
      </div>
      <div className={styles["boundary-line"]} />
      <div className={styles["threads-area"]}>
        <h2 className={styles["header"]}>
          <BsFillThreadsFill size={20} color="rgb(44, 44, 44)" />
          Threads
        </h2>
        <ThreadsItemBox />
        <div className={styles["bottom"]}>
          <button type="button">View more</button>
        </div>
      </div>
      <div className={styles["boundary-line"]} />
      <div className={styles["promotion-area"]}>
        <h2 className={styles["header"]}>
          <TbSpeakerphone size={20} color="rgb(44, 44, 44)" />
          Promotion
        </h2>
        <div className={styles["promotion-carousel-wrapper"]}>
          <ThumbnailCarouselBox thumbnailItemType="background" />
        </div>
        <div className={styles["bottom"]}>
          <button type="button">View more</button>
        </div>
      </div>
      <div className={styles["boundary-line"]} />
    </div>
  );
};

export default MainPageLayout;
