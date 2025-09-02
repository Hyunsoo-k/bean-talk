import type { JSX } from "react";
import { BsFillThreadsFill } from "react-icons/bs";
import { TbSpeakerphone } from "react-icons/tb";

import ThumbnailCardCarousel from "@/components/thumbnail-card-carousel";
import ThreadsBox from "@/components/threads/threads-box";

import styles from "./index.module.scss";

const MainPageLayout = (): JSX.Element => {
  return (
    <div className={styles["main-page-layout-component"]}>
      <div className={styles["news-carousel-wrapper"]}>
        <ThumbnailCardCarousel />
      </div>
      <div className={styles["boundary-line"]} />
      <div className={styles["threads-area"]}>
        <h2 className={styles["header"]}>
          <BsFillThreadsFill size={20} color="rgb(44, 44, 44)" />
          스레드
        </h2>
        <ThreadsBox />
        <div className={styles["bottom"]}>
          <button type="button">View more</button>
        </div>
      </div>
      <div className={styles["boundary-line"]} />
      <div className={styles["promotion-area"]}>
        <h2 className={styles["header"]}>
          <TbSpeakerphone size={20} color="rgb(44, 44, 44)" />
          프로모션
        </h2>
        <div className={styles["promotion-carousel-wrapper"]}>
          <ThumbnailCardCarousel />
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
