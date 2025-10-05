import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThumbnailContainerFlex from "@/components/thumbnail-container/thumbnail-container-flex";

import styles from "./index.module.scss";

const JobPageLayout = (): JSX.Element => {

  return (
    <div className={styles["job-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="구인·구직" path="/bbs/categories/job" />
      <div className={styles["main"]}>
        <ThumbnailContainerFlex category="job" />
      </div>
    </div>
  );
};

export default JobPageLayout;