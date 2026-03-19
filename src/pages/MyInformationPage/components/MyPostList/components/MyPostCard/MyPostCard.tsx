import { Link } from "react-router-dom";

import type { MyPost } from "@/types/myPost";
import { formatDate } from "@/utils/formatDate";

import styles from "./MyPostCard.module.scss";

type Props = {
  myPost: MyPost;
};

const MyPostCard = ({ myPost }: Props) => {
  const {
    _id,
    category,
    title,
    content,
    thumbnailUrl,
    createdAt
  } = myPost;

  return (
    <Link
      to={`/categories/${category}/posts/${_id}`}
      className={styles["my-post-card-component"]}
    >
      <div className={styles["text-area"]}>
        <div className={styles["header"]}>
          <p className={styles["title"]}>
            {title}
          </p>
        </div>
        <div className={styles["body"]}>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        <div className={styles["footer"]}>
          <small className={styles["created-at"]}>
            {formatDate(createdAt)}
          </small>
        </div>
      </div>
      {thumbnailUrl && <img src={thumbnailUrl} className={styles["thumbnail"]} />}
    </Link>
  );
};

export { MyPostCard };