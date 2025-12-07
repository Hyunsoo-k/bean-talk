import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import ThumbnailContainerFlex from "@/features/posts/components/thumbnail-containers/thumbnail-container-flex";

import styles from "./index.module.scss";

const NoticeListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["notice-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="공지사항" path="/notice/list" />
      <div className={styles["main"]}>
        <ThumbnailContainerFlex />
      </div>
    </div>
  );
};

export default NoticeListPageLayout;
