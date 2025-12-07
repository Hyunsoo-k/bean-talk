import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import ThreadsContainer from "@/features/posts/components/thumbnail-containers/threads-container";

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
