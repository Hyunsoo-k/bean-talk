import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThumbnailContainerFlex from "@/components/thumbnail-containers/thumbnail-container-flex";

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
