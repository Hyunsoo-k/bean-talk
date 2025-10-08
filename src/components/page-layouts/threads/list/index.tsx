import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThreadsContainer from "@/components/threads-container";

import styles from "./index.module.scss";

const ThreadsListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["threads-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="스레드" path="/threads/list" />
      <ThreadsContainer isRenderedOnMainPage={false} />
    </div>
  );
};

export default ThreadsListPageLayout;
