import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThumbnailFlexBox from "@/components/thumbnail/thumbnail-box/thumbnail-flex-box";

import styles from "./index.module.scss";

const SuggestionListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["suggestion-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="건의사항" path="/suggestion/list" />
      <div className={styles["main"]}>
        <ThumbnailFlexBox />
      </div>
    </div>
  );
};

export default SuggestionListPageLayout;
