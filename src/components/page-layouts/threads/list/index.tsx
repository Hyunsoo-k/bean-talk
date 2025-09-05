import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThreadsItemBox from "@/components/threads/threads-item-box";

import styles from "./index.module.scss";

const ThreadsListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["threads-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="스레드" path="/threads/list" />
      <div className={styles["main"]}>
        <ThreadsItemBox />
      </div>
    </div>
  );
};

export default ThreadsListPageLayout;
