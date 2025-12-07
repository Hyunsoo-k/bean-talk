import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import PostViewer from "@/components/PostDetail/PostDetail";

import styles from "./index.module.scss";

const NoticePostPageLayout = (): JSX.Element => {
  return (
    <div className={styles["notice-post-page-layout-component"]}>
      <BreadCrumb breadCrumbName="스레드" path="/notice/list" />
      <PostViewer />
    </div>
  );
};

export default NoticePostPageLayout;
