import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import PostCreator from "@/components/PostEditor/PostEditor";

import styles from "./index.module.scss";

const NewsPostCreatePageLayout = (): JSX.Element => {
  return (
    <div className={styles["news-post-create-page-layout-component"]}>
      <BreadCrumb breadCrumbName="뉴스" path="/news/list" createOrEdit="create" />
      <PostCreator />
    </div>
  );
};

export default NewsPostCreatePageLayout;