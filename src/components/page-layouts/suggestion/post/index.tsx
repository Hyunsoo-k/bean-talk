import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import PostViewer from "@/components/post/post-viewer";

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
