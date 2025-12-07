import type { JSX } from "react";

import type { Category } from "@/types";
import type { Post } from "@/types/post";
import { PostDetailHeader } from "./components/PostDetailHeader/PostDetailHeader";

import styles from "./PostDetail.module.scss";

type Props<T extends Category> = {
  isLoading: boolean;
  category: T;
  postDetail: Post<T>;
};

const PostDetail = <T extends Category>({
  isLoading,
  category,
  postDetail
}: Props<T>): JSX.Element => {
  if (isLoading) {
    return <div></div>
  }

  const { content } = postDetail;

  return (
    <div className={styles["post-detail-component"]}>
      <PostDetailHeader category={category} postDetail={postDetail} />
      <div className={styles["body"]}>
        <div
          className={styles["content"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export { PostDetail };
