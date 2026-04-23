import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";
import { formatDate } from "@/utils/formatDate";

import defaultImage from "@/assets/default-images/default-image.jpg";
import styles from "./PostCardJob.module.scss";

type Props<T extends Category> = {
  post: Post<T>;
};

const PostCardJob = <T extends Category>({ post }: Props<T>) => {
  const {
    _id,
    subCategory,
    author: { nickname },
    createdAt,
    title,
  } = post as Post<"job">;

  return (
    <Link
      to={`/categories/job/posts/${_id}`}
      className={styles["post-card-job-component"]}
    >
      <div className={styles["information"]}>
        <div className={styles["meta-data"]}>
          <span className={styles["author"]}>
            {nickname}
          </span>
          <div className={styles["boundary-dot"]}/>
          <span className={styles["created-at"]}>
            {formatDate(createdAt)}
          </span>
          <div className={styles["boundary-dot"]}/>
          <span className={styles["sub-category"]}>
            {SUB_CATEGORY_TO_KR_MAP[subCategory]}
          </span>
        </div>
        <div className={styles["body"]}>
          <h2 className={styles["title"]}>
            {title}
          </h2>
        </div>
      </div>
      <div
        className={styles["thumbnail-image"]}
        style={{ backgroundImage: `url(${defaultImage})`}}
      />
    </Link>
  );
};

export { PostCardJob };