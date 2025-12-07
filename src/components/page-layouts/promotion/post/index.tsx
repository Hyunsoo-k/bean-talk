import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import PostViewer from "@/components/PostDetail/PostDetail";

import styles from "./index.module.scss";

const PromotionPostPageLayout = (): JSX.Element => {
  return (
    <div className={styles["promotion-post-page-layout-component"]}>
      <BreadCrumb breadCrumbName="스레드" path="/promotion/list" />
      <PostViewer />
    </div>
  );
};

export default PromotionPostPageLayout;
