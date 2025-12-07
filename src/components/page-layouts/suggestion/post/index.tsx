import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import PostViewer from "@/components/PostDetail/PostDetail";

import styles from "./index.module.scss";

const SuggestionPostPageLayout = (): JSX.Element => {
  return (
    <div className={styles["suggestion-post-page-layout-component"]}>
      <BreadCrumb breadCrumbName="스레드" path="/suggestion/list" />
      <PostViewer />
    </div>
  );
};

export default SuggestionPostPageLayout;
