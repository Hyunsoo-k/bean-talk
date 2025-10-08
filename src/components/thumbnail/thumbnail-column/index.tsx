import type { JSX } from "react";
import { Link } from "react-router-dom";

import type { Post } from "@/types/post";
import { SUB_CATEGORY_TO_KOREAN_MAP } from "@/constants/sub-category-map";
import formatDateToKST from "@/utils/format-date-to-kst";

import mockImage from "@/assets/default-images/mock-image.jpg";
import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./index.module.scss";

type Props = {
  post: Post;
};

const ThumbnailColumn = ({ post }: Props): JSX.Element => {
  const {
    thumbnailUrl,
    subCategory,
    createdAt,
    author,
    title,
    content,
  } = post;

  console.log(post)

  return (
    <Link to="" className={styles["thumbnail-column-component"]}>
      <div className={styles["thumbnail-image-wrapper"]}>
        <div
          className={styles["thumbnail-image"]}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.2)),
              url(${thumbnailUrl || mockImage})
            `
          }}
        />
      </div>
      <div className={styles["information"]}>
        <div className={styles["top"]}>
          <h2 className={styles["title"]}>
            {title}
          </h2>
        </div>
        <div className={styles["middle"]}>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        <div className={styles["bottom"]}>
          <div className={styles["author-and-sub-category-area"]}>
            <span className={styles["author"]}>
              {author.nickname}
            </span>
            {subCategory && (
              <>
                <div className={styles["boundary-dot"]}/>
                <small className={styles["sub-category"]}>
                  {SUB_CATEGORY_TO_KOREAN_MAP[subCategory]}
                </small>
              </>
            )}
          </div>
          <div className={styles["created-at-and-views-area"]}>
            <small className={styles["created-at"]}>
              {formatDateToKST(createdAt)}
            </small>
            <div className={styles["boundary-dot"]}/>
            <small className={styles["views"]}>
              조회 300
            </small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ThumbnailColumn;