import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import PostViewer from "@/components/PostDetail/PostDetail";

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
