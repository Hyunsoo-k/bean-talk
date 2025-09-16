import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import PostViewer from "@/components/post/post-viewer";

import styles from "./index.module.scss";

const ThreadsPostPageLayout = (): JSX.Element => {
  return (
    <div className={styles["threads-post-page-layout-component"]}>
      <BreadCrumb breadCrumbName="스레드" path="/threads/list" />
      <PostViewer />
    </div>
  );
};

export default ThreadsPostPageLayout;
