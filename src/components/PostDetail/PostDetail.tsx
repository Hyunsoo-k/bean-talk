import type { JSX } from "react";

import type { Category } from "@/types";
import type { Post } from "@/types/post";

import styles from "./PostDetail.module.scss";

type Props<T extends Category> = {
  isLoading: boolean;
  post: Post<T>;
};

const PostDetail = <T extends Category>({ isLoading, post }: Props<T>): JSX.Element => {
  const { content } = post;

  if (isLoading) {
    return <div></div>
  }

  return (
    <div
      className={styles["post-detail-component"]}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export { PostDetail };
