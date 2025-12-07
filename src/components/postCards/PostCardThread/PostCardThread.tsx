import type { JSX, MouseEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { BsShare } from "react-icons/bs";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils";
import { CommentSection } from "@/components/CommentSection";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./PostCardThread.module.scss";

type Props = {
  category: Category;
  post: Post;
};

const PostCardThread = ({ category, post }: Props): JSX.Element => {
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);

  const {
    _id: post_id,
    author: { nickname },
    content,
    commentCount,
    likes,
    createdAt,
  } = post;

  const handleClickCommentCount = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

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
            style={{ backgroundImage: `url(${defaultProfile})` }} 
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
          <div onClick={(e) => { e.stopPropagation(); }} className={styles["footer"]}>
            <button type="button" onClick={handleClickCommentCount}>
              <LuMessageCircleMore size={19} color="rgb(44, 44, 44)" />
              {commentCount}
            </button>
            <button type="button">
              <FaRegHeart size={18} color="rgb(44, 44, 44)" />
              {likes?.length}
            </button>
            <button type="button">
              <BsShare size={18} color="rgb(44, 44, 44)" />
            </button>
          </div>
      </Link>
      {isCommentSectionOpen && (
        <CommentSection category="thread" post_id={post_id} />
      )}
    </div>
  );
};

export { PostCardThread };
