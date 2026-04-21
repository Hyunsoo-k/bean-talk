import { useLocation } from "react-router-dom";

import type { Category } from "@/types/category";
import { extractPost_id } from "@/utils/extractPost_id";
import { useGetPostDetail } from "@/hooks/useGetPostDetail";
import { FullPageSpinner } from "@/components/spinners/FullPageSpinner/FullPageSpinner";
import { PostDetailHeader } from "@/components/PostDetail/components/PostDetailHeader/PostDetailHeader";
import { PostDetailContent } from "@/components/PostDetail/PostDetailContent";
import { PostMetaStats } from "@/components/PostMetaStats/PostMetaStats";
import { CommentSection } from "@/components/CommentSection/CommentSection";
import { SameTopicCarousel } from "./components/SameTopicCarousel/SameTopicCarousel";

import styles from "./PostDetailPage.module.scss";

type Props = {
  category: Category
};

const PostDetailPage = ({ category }: Props) => {
  const { pathname } = useLocation();

  const post_id = extractPost_id(pathname);

  const { isLoading, data: post } = useGetPostDetail(category, post_id);

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <div className={styles["post-detail-page-component"]}>
      <PostDetailHeader category={category} post={post} />
      <PostDetailContent isLoading={isLoading} post={post} />
      <PostMetaStats
        category={category}
        post={post}
        isLoading={isLoading}
      />
      <CommentSection category={category} post_id={post_id} />
      <SameTopicCarousel category={category} />
    </div>
  );
};

export { PostDetailPage };
