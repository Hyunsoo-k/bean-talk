import { Link } from "react-router-dom";

import type { Post } from "@/types/post";
import type { Category } from "@/types/category";
import { formatDate } from "@/utils/formatDate";

import styles from "./PostCardSimple.module.scss";

type Props = {
  post: Post<Category>;
  noStaticWidth?: boolean;
};

const PostCardSimple = ({ post, noStaticWidth }: Props) => {
  const {
    _id: post_id,
    category,
    thumbnailUrl,
    author,
    createdAt,
    title,
    content
  } = post;

  return (
    <Link
      to={`/categories/${category}/posts/${post_id}`}
      className={`${styles["post-card-simple-component"]} ${noStaticWidth ? styles["no-static-width"] : ""}`}
    >
      {thumbnailUrl && (
        <div className={styles["thumbnail-wrapper"]}>
          <img src={thumbnailUrl} alt={title} className={styles["thumbnail"]} />
        </div>
      )}
      <div className={styles["main"]}>
        <header className={styles["header"]}>
          <h2 className={styles["title"]}>
            {title}
          </h2>
        </header>
        <div className={styles["body"]}>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        <footer className={styles["footer"]}>
          <span className={styles["author"]}>
            {author.nickname}
          </span>
          <span className={styles["created-at"]}>
            {formatDate(createdAt)}
          </span>
        </footer>
      </div>
    </Link>
  );
};

export { PostCardSimple };