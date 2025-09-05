import type { JSX } from "react";

import BreadCrumb from "@/components/bread-crumb";
import ThumbnailGridBox from "@/components/thumbnail/thumbnail-grid-box";

import styles from "./index.module.scss";

const PromotionListPageLayout = (): JSX.Element => {
  return (
    <div className={styles["promotion-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="홍보" path="/promotion/list" />
      <div className={styles["main"]}>
        <ThumbnailGridBox thumbnailItemType="background" />
      </div>
    </div>
  );
};

export default PromotionListPageLayout;