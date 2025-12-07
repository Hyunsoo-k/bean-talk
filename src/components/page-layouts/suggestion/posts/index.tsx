import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import ThumbnailContainerFlex from "@/features/posts/components/thumbnail-containers/thumbnail-container-flex";

import styles from "./index.module.scss";

const SuggestionListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["suggestion-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="건의사항" path="/suggestion/list" />
      <div className={styles["main"]}>
        <ThumbnailContainerFlex />
      </div>
    </div>
  );
};

export default SuggestionListPageLayout;
