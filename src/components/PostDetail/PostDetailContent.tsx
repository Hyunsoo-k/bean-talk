import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { useMapRenderer } from "./hooks/useMapRenderer";

import styles from "./PostDetailContent.module.scss";

type Props<T extends Category> = {
  isLoading: boolean;
  post: Post<T>;
};

const PostDetailContent = <T extends Category>({ isLoading, post }: Props<T>) => {
  const { content } = post;

  useMapRenderer(isLoading, content);

  if (isLoading) {
    return <div className={styles["post-detail-content-component"]}></div>;
  }

  return (
    <div
      className={styles["post-detail-content-component"]}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export { PostDetailContent };