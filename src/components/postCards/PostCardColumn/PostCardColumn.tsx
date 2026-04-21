import { Link } from "react-router-dom";

import type { Category, CategoryHavingSubCategory, SubCategory } from "@/types/category";
import type { Post } from "@/types/post";
import { isPostHavingSubCategory } from "@/utils/isPostHavingSubCategory";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";

import mockImage from "@/assets/default-images/mock-image.jpg";
import styles from "./PostCardColumn.module.scss";

type Props<T extends Category> = {
  post: Post<T>;
};

const PostCardColumn = <T extends Category>({ post }: Props<T>) => {
  const {
    _id: post_id,
    thumbnailUrl,
    category,
    author,
    title,
    content,
  } = post;

  const hasSubCategory = isPostHavingSubCategory(post);

  return (
    <Link
      to={`/categories/${category}/posts/${post_id}`}
      className={styles["post-card-column-component"]}
    >
      <div className={styles["thumbnail-wrapper"]}>
        <img src={thumbnailUrl || mockImage} className={styles["thumbnail"]} />
      </div>
      <div className={styles["main"]}>
        <header className={styles["header"]}>
          <div className={styles["author-and-sub-category"]}>
            <span className={styles["author"]}>
              {author.nickname}
            </span>
            {hasSubCategory && (
              <>
                <div className={styles["boundary-dot"]} />
                <span className={styles["sub-category"]}>
                  {SUB_CATEGORY_TO_KR_MAP[post.subCategory as SubCategory<CategoryHavingSubCategory>]}
                </span>
              </>
            )}
          </div>
          <h2 className={styles["title"]}>
            {title}
          </h2>
        </header>
        <div className={styles["body"]}>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        <footer className={styles["footer"]}>
          <button
            type="button"
            className={styles["read-more-button"]}
            >
              Read More
          </button>
        </footer>
      </div>
    </Link>
  );
};

export { PostCardColumn };