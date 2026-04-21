import { Link } from "react-router-dom";

import type { Post } from "@/types/post";
import type { Category, CategoryHavingSubCategory, SubCategory } from "@/types/category";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";
import { isPostHavingSubCategory } from "@/utils/isPostHavingSubCategory";
import { formatDate } from "@/utils/formatDate";

import defaultImage from "@/assets/default-images/default-image.jpg";
import styles from "./PostCardNews.module.scss";

type Props<T extends Category> = {
  post:Post<T>
};

const PostCardNews = <T extends Category>({ post }: Props<T>) => {
  const {
    _id: post_id,
    category,
    thumbnailUrl,
    title,
    content,
    createdAt
  } = post;

  const hasSubCategory = isPostHavingSubCategory(post);

  return (
    <Link to={`/categories/${category}/posts/${post_id}`} className={styles["post-card-news-component"]}>
      <div className={styles["thumbnail-wrapper"]}>
        <img className={styles["thumbnail"]} src={thumbnailUrl ?? defaultImage} alt={title} />
      </div>
      <header className={styles["header"]}>
        <div className={styles["meta-data"]}>
          <span className={styles["sub-category"]}>
            {hasSubCategory && SUB_CATEGORY_TO_KR_MAP[post.subCategory as SubCategory<CategoryHavingSubCategory>]}
          </span>
          <span className={styles["created-at"]}>
            {formatDate(createdAt)}
          </span>
        </div>
        <h3 className={styles["title"]}>
          {title}
        </h3>
      </header>
      <div className={styles["body"]}>
        <p className={styles["content"]}>
          {content}
        </p>
      </div>
    </Link>
  );
};

export { PostCardNews };