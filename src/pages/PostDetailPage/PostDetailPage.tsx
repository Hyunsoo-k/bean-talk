import type { JSX } from "react";
import { useLocation } from "react-router-dom";

import type { Category } from "@/types";
import { extractPost_id } from "@/utils";
import { useGetPostDetail } from "@/hooks";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { PostDetail } from "@/components/PostDetail";
import { PostMetaStats } from "@/components/PostDetail/components/PostMetaStats";
import { CommentSection } from "@/components/CommentSection";

import styles from "./PostDetailPage.module.scss";

type Props = {
  category: Category
};

const PostDetailPage = ({ category }: Props): JSX.Element => {
  const { pathname } = useLocation();

  const post_id = extractPost_id(pathname);

  const { isLoading, data: queryData } = useGetPostDetail(category, post_id);

  return (
    <div className={styles["post-detail-page-component"]}>
      <BreadCrumb
        category={category}
        {...(queryData?.subCategory && {
        subCategory: queryData.subCategory,
      })}
        usage="postDetail"
      />
      <PostDetail
        isLoading={isLoading}
        category={category}
        postDetail={queryData}
      />
      <PostMetaStats
        isLoading={isLoading}
        category={category}
        queryData={queryData}
      />
      <CommentSection category={category} post_id={post_id} />
    </div>
  );
};

export { PostDetailPage };
