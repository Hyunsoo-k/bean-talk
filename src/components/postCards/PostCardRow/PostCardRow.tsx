import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils";

import mockImage from "@/assets/default-images/mock-image.jpg";
import styles from "./PostCardRow.module.scss";
import { PostMetaStats } from "@/components/PostMetaStats";

type Props<T extends Category> = {
  category: Category;
  post: Post<T>;
};

const PostCardRow = <T extends Category>({ category, post }: Props<T>) => {
  const {
    _id: post_id,
    thumbnailUrl,
    createdAt,
    author,
    title,
    content
  } = post;

  return (
    <Link to={`/categories/${category}/posts/${post_id}`} className={styles["post-card-row-component"]}>
      <div className={styles["header"]}>
        <span className={styles["author"]}>
          {author.nickname}
        </span>
        <div className={styles.dot} />
        <span className={styles["created-at"]}>
          {formatDate(createdAt)}
        </span>
      </div>
      <div className={styles["body"]}>
        <div className={styles["text"]}>
          <h2 className={styles["title"]}>
            {title}
          </h2>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        <div
          className={styles["thumbnail"]}
          style={{ backgroundImage: `url(${thumbnailUrl || mockImage})` }}
        />
      </div>
      <div className={styles["footer"]}>
        <PostMetaStats
          category={category}
          post={post}
        />
      </div>
    </Link>
  );
};

export { PostCardRow };
