import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import PostViewer from "@/components/PostDetail/PostDetail";

import styles from "./index.module.scss";

const NewsPostPageLayout = (): JSX.Element => {
  return (
    <div className={styles["news-post-page-layout-component"]}>
      <BreadCrumb breadCrumbName="스레드" path="/news/list" />
      <PostViewer />
    </div>
  );
};

export default NewsPostPageLayout;
