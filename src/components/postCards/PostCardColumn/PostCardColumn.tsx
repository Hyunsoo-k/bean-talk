import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";

import type { Category, SubCategory } from "@/types/category";
import type { Post } from "@/types/post";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";

import mockImage from "@/assets/default-images/mock-image.jpg";
import styles from "./PostCardColumn.module.scss";

type Props<T extends Category> = {
  category: Category;
  post: Post<T>;
};

const PostCardColumn = <T extends Category>({ category, post }: Props<T>) => {
  const {
    _id: post_id,
    thumbnailUrl,
    subCategory,
    author,
    title,
    content,
  } = post;

  return (
    <Link
      to={`/categories/${category}/posts/${post_id}`}
      className={styles["post-card-column-component"]}
    >
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
      <div className={styles["main"]}>
        <div className={styles["header"]}>
          <div className={styles["author-and-sub-category"]}>
            <span className={styles["author"]}>
              {author.nickname}
            </span>
            <div className={styles["boundary-dot"]} />
            <span className={styles["sub-category"]}>
              {SUB_CATEGORY_TO_KR_MAP[subCategory as SubCategory<T>]}
            </span>
          </div>
          <h2 className={styles["title"]}>
            {title}
          </h2>
        </div>
        <div className={styles["body"]}>
          <p className={styles["content"]}>
            {content}{content}{content}{content}{content}{content}
          </p>
        </div>
        <div className={styles["footer"]}>
          <button
            type="button"
            className={styles["read-more-button"]}
            >
              Read more
              <SlArrowRight size={11} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export { PostCardColumn };