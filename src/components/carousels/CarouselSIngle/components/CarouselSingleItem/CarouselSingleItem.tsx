import { Link } from "react-router-dom";

import type { Post } from "@/types/post";

import defualtImage from "@/assets/default-images/default-image.jpg";
import styles from "./CarouselSingleItem.module.scss";

type Props = {
  post: Post<"news">;
};

const CarouselSingleItem = ({ post }: Props) => {
  const {
    _id: post_id,
    title,
    content,
    thumbnailUrl
  } = post;

  return (
    <Link
      to={`/categories/news/posts/${post_id}`}
      className={styles["carousel-single-item"]}
      style={{ backgroundImage: `url(${thumbnailUrl || defualtImage})` }}
    >
      <div className={styles["header"]}>
        <span className={styles["category"]}>
          News
        </span>
        <h2 className={styles["title"]}>
          {title}
        </h2>
      </div>
      <div className={styles["body"]}>
        <p className={styles["content"]}>
          {content}
        </p>
      </div>
    </Link>
  );
};

export { CarouselSingleItem };