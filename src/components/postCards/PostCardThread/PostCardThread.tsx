import { useState } from "react";
import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils/formatDate";
import { CommentSection } from "@/components/CommentSection/CommentSection";
import { PostMetaStats } from "@/components/PostMetaStats/PostMetaStats";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./PostCardThread.module.scss";

type Props<T extends Category> = {
  category: Category;
  post: Post<T>;
};

const PostCardThread = <T extends Category>({ category,  post}: Props<T>) => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);

  const {
    _id: post_id,
    author: {
      profileImageUrl,
      nickname
    },
    content,
    createdAt,
  } = post;

  const handleClickCommentCount = () => {
    setIsCommentSectionOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["post-card-thread-component"]}>
      <Link
        to={`/categories/${category}/posts/${post_id}`}
        className={styles["link-area"]}
      >
        <div className={styles["header"]}>
          <div
            className={styles["profile-image"]}
            style={{ backgroundImage: `url(${profileImageUrl || defaultProfile})` }} 
          />
          <span className={styles["author"]}>
            {nickname}
          </span>
          <div className={styles["dot"]} />
          <span className={styles["created-at"]}>
            {formatDate(createdAt)}
          </span>
        </div>
          <div className={styles["body"]}>
            <p className={styles["content"]}>
              {content}
            </p>
          </div>
          <PostMetaStats
            category={category}
            post={post}
            handleClickCommentIcon={handleClickCommentCount}
          />
      </Link>
      {isCommentSectionOpen && (
        <CommentSection category="thread" post_id={post_id} />
      )}
    </div>
  );
};

export { PostCardThread };
