import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils/formatDate";
import { CommentSection } from "@/components/CommentSection/CommentSection";
import { PostMetaStats } from "@/components/PostMetaStats/PostMetaStats";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./PostCardThread.module.scss";

type Props<T extends Category> = {
  post: Post<T>;
};

const PostCardThread = <T extends Category>({ post}: Props<T>) => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const {
    _id: post_id,
    author: {
      profileImageUrl,
      nickname
    },
    thumbnailUrl,
    content,
    createdAt,
  } = post;

  const handleClickCommentCount = () => {
    setIsCommentSectionOpen((prev: boolean) => !prev);
  };

  return (
    <div className={`${styles["post-card-thread-component"]} ${isHomePage && styles["in-home-page"]}`}>
      <Link
        to={`/categories/thread/posts/${post_id}`}
        className={styles["link"]}
      >
        <header className={styles["header"]}>
          <img
            src={profileImageUrl || defaultProfile}
            className={styles["profile-image"]}
          />
          <span className={styles["author"]}>
            {nickname}
          </span>
          <div className={styles["boundary-dot"]} />
          <span className={styles["created-at"]}>
            {formatDate(createdAt)}
          </span>
        </header>
        <div className={styles["body"]}>
          <p className={styles["content"]}>
            {content}
          </p>
          {thumbnailUrl && <img src={thumbnailUrl} className={styles["thumbnail"]} />}
        </div>
        <PostMetaStats
          category="thread"
          post={post}
          handleClickCommentIcon={handleClickCommentCount}
          noPadding={true}
        />
      </Link>
      {isCommentSectionOpen && (
        <CommentSection category="thread" post_id={post_id} noPadding={true} />
      )}
    </div>
  );
};

export { PostCardThread };
