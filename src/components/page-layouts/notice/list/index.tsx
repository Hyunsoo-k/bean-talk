import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThumbnailFlexBox from "@/components/thumbnail/thumbnail-box/thumbnail-flex-box";

import styles from "./index.module.scss";

const NoticeListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["notice-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="공지사항" path="/notice/list" />
      <div className={styles["main"]}>
        <ThumbnailFlexBox />
      </div>
    </div>
  );
};

export default NoticeListPageLayout;
