import type { JSX } from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";

import type { Category, SubCategory } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants";

import mockImage from "@/assets/default-images/mock-image.jpg";
import styles from "./PostCardRow.module.scss";

type Props = {
  category: Category;
  post: Post<"news">;
};

const PostCardRow = ({ category, post }: Props): JSX.Element => {
  const {
    _id: post_id,
    subCategory,
    thumbnailUrl,
    createdAt,
    author,
    title,
    content,
    views,
    commentCount,
    likes
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
        <div className={styles.dot} />
        <span className={styles["sub-category"]}>
          {SUB_CATEGORY_TO_KR_MAP[subCategory as SubCategory]}
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
          style={{ backgroundImage: `url(${mockImage})` }}
        />
      </div>
      <div className={styles["footer"]}>
        <div className={styles["icon-wrapper"]}>
          <IoEyeOutline size={19} color="rgb(44, 44, 44)" />
          {views}
        </div>
        <div className={styles["icon-wrapper"]}>
          <LuMessageCircleMore size={19} color="rgb(44, 44, 44)" />
          {commentCount}
        </div>
        <div className={styles["icon-wrapper"]}>
          <FaRegHeart size={19} color="rgb(44, 44, 44)" />
          {likes.length}
        </div>
      </div>
    </Link>
  );
};

export { PostCardRow };
