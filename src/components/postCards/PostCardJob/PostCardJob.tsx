import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { JOB_DETAIL_FORM_MAP_TO_KOR } from "@/constants/jobDetailFormMap";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";
import { formatDate } from "@/utils/formatDate";

import defaultImage from "@/assets/default-images/default-image.jpg";
import styles from "./PostCardJob.module.scss";

type Props<T extends Category> = {
  category: Category
  post: Post<T>;
};

const PostCardJob = <T extends Category>({ category, post }: Props<T>) => {
  const {
    _id,
    subCategory,
    author: { nickname },
    createdAt,
    title,
    position,
    employmentType,
    payAmount,
    startTime,
    endTime,
    address
  } = post;

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
          <div className={styles["detail"]}>
            <span>
              모집 분야: {JOB_DETAIL_FORM_MAP_TO_KOR[position]}
            </span>
            <span>
              {employmentType === "partTime"
                ? `시급: ${payAmount}원`
                : `월급: ${payAmount}만원`
              }
            </span>
            <span>
              근무 시간: {startTime} ~ {endTime}
            </span>
            {subCategory === "hiring" && (
              <span>
                매장 위치: {address}
              </span>
            )}
          </div>
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