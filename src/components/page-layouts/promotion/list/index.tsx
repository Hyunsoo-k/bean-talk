import type { JSX } from "react";

import BreadCrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import ThumbnailGridBox from "@/features/posts/components/thumbnail-containers/thumbnail-container-grid";

import styles from "./index.module.scss";
import useGetPostsQuery from "@/hooks/api/posts/use-get-posts-query";

const PromotionListPageLayout = (): JSX.Element => {
  const { data: queryData } = useGetPostsQuery("promotion");

  return (
    <div className={styles["promotion-list-page-layout-component"]}>
      <BreadCrumb breadCrumbName="홍보" path="/promotion/list" />
      <div className={styles["main"]}>
        <ThumbnailGridBox thumbnailItemType="background" category="promotion" />
      </div>
    </div>
  );
};

export default PromotionListPageLayout;
