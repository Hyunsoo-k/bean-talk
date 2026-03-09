import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

import defaultImage from "@/assets/default-images/default-image.jpg";
import styles from "./PostCardBackground.module.scss";

type Props<T extends Category> = {
  category: Category
  post: Post<T>;
};

const PostCardBackground = <T extends Category>({ category, post }: Props<T>) => {
  const {
    _id,
    thumbnailUrl,
    title,
    content
  } = post;

  return (
    <Link
      to={`/categories/${category}/posts/${_id}`}
      className={styles["post-card-background-component"]}
      style={{ backgroundImage: `url(${thumbnailUrl || defaultImage})`}}
    >
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>
          {title}
        </h2>
      </div>
      <div className={styles["body"]}>
        <p className={styles["content"]}>
          {content}
        </p>
      </div>
      <div className={styles["footer"]}>
        <span className={styles["read-more"]}>
          Read more
        </span>
      </div>
    </Link>
  );
};

export { PostCardBackground };
