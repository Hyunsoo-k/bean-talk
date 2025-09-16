import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThumbnailFlexBox from "@/components/thumbnail/thumbnail-box/thumbnail-flex-box";

import styles from "./index.module.scss";

const NewsListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["news-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="뉴스" path="/news/list" />
      <div className={styles["main"]}>
        <ThumbnailFlexBox />
      </div>
    </div>
  );
};

export default NewsListPageLayout;
