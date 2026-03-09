import type { JSX } from "react";
import { useLocation } from "react-router-dom";

import type { Category } from "@/types";
import { extractPost_id } from "@/utils";
import { useGetPostDetail } from "@/hooks";
import { BreadCrumb } from "@/components/BreadCrumb/BreadCrumb";
import { FullPageSpinner } from "@/components/spinners";
import { PostDetailHeader } from "@/components/PostDetail/components/PostDetailHeader";
import { JobDetail } from "@/components/PostDetail/components/JobDetail/JobDetail";
import { PostDetail } from "@/components/PostDetail";
import { PostMetaStats } from "@/components/PostMetaStats";
import { CommentSection } from "@/components/CommentSection";

import styles from "./PostDetailPage.module.scss";

type Props = {
  category: Category
};

const PostDetailPage = ({ category }: Props): JSX.Element => {
  const { pathname } = useLocation();

  const post_id = extractPost_id(pathname);

  const { isLoading, data: post } = useGetPostDetail(category, post_id);

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <div className={styles["post-detail-page-component"]}>
      <BreadCrumb
        category={category}
        {...(post?.subCategory && {
          subCategory: post.subCategory,
        })}
        usage="postDetail"
      />
      <PostDetailHeader category={category} post={post} />
      {category === "job" && (
        <>
          <h2 className={styles["section-title"]}>
            {post?.subCategory === "hiring"
              ? "모집 정보"
              : "지원 정보"
            }
          </h2>
          <JobDetail post={post} />
          <h2 className={styles["section-title"]}>
            상세 내용
          </h2>
        </>
      )}
      <PostDetail isLoading={isLoading} post={post} />
      <PostMetaStats
        category={category}
        post={post}
        isLoading={isLoading}
      />
      <CommentSection category={category} post_id={post_id} />
    </div>
  );
};

export { PostDetailPage };
