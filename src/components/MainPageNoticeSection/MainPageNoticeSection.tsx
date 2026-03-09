import type { JSX } from "react";

import { MarketTrendTextItem } from "./components/NoticeSectionTextItem";
import { MarketTrendThumbnailItem } from "./components/NoticeSectionThumbnailItem";

import styles from "./MainPageNoticeSection.module.scss";

const MainPageNoticeSection = (): JSX.Element => {
  return (
    <div className={styles["market-trend-section-component"]}>
      <MarketTrendTextItem />
      <MarketTrendThumbnailItem />
    </div>
  );
};

export { MainPageNoticeSection };