import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils/formatDate";

import styles from "./PostCardRow.module.scss";

type Props<T extends Category> = {
  post: Post<T>;
};

const PostCardRow = <T extends Category>({ post }: Props<T>) => {
  const {
    _id: post_id,
    thumbnailUrl,
    category,
    createdAt,
    author,
    title,
    content
  } = post;

  return (
    <Link
      to={`/categories/${category}/posts/${post_id}`}
      className={styles["post-card-row-component"]}
    >
      <div className={styles["body"]}>
        <div className={styles["text"]}>
          <h2 className={styles["title"]}>
            {title}
          </h2>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        {thumbnailUrl && (
          <div
            className={styles["thumbnail"]}
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
        )}
      </div>
      <footer className={styles["footer"]}>
        <span className={styles["author"]}>
          {author.nickname}
        </span>
        <div className={styles["boundary-dot"]} />
        <span className={styles["created-at"]}>
          {formatDate(createdAt)}
        </span>
        <div className={styles["boundary-dot"]} />
        <span>
          댓글 {post.commentCount}
        </span>
      </footer>
    </Link>
  );
};

export { PostCardRow };
