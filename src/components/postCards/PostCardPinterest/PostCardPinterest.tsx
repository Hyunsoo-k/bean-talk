import { Link } from "react-router-dom";
import { RiQuillPenLine } from "react-icons/ri";

import type { Post } from "@/types/post";
import type { Category } from "@/types/category";

import styles from "./PostCardPinterest.module.scss";

type Props = {
  post: Post<Category>;
};

const PostCardPinterest = ({ post }: Props) => {
  const {
    _id: post_id,
    thumbnailUrl,
    category,
    author,
    title,
    content
  } = post;

  return (
    <Link to={`/categories/${category}/posts/${post_id}`} className={styles["post-card-pinterest-component"]}>
      {thumbnailUrl && <img src={thumbnailUrl} className={styles["thumbnail"]} />}
      <div className={styles["main"]}>
        <header>
          <h3 className={styles["title"]}>
            {title}
          </h3>
        </header>
        <div className={styles["body"]}>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
      </div>
      <footer className={styles["footer"]}>
        <span className={styles["author"]}>
          <RiQuillPenLine className={styles["pen-icon"]} />
          {author.nickname}
        </span>
      </footer>
    </Link>
  );
};

export { PostCardPinterest };