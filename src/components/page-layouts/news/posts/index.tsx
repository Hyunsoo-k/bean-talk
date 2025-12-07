import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import ThumbnailContainerFlex from "@/features/posts/components/thumbnail-containers/thumbnail-container-flex";

import styles from "./index.module.scss";

const NewsListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["news-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="뉴스" path="/news/list" />
      <div className={styles["main"]}>
        <ThumbnailContainerFlex />
      </div>
    </div>
  );
};

export default NewsListPageLayout;
