import type { JSX, MouseEvent } from "react";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import type { Post } from "@/types/post";
import formatDateToKST from "@/utils/format-date-to-kst";
import MenuModal from "@/components/modal/menu-modal";
import CommentSection from "@/components/comment/comment-section";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import threeDotsinThread from "@/assets/images/three-dots-in-thread.png";
import styles from "./index.module.scss";

type Props = {
  post: Post;
};

const Thread = ({ post }: Props): JSX.Element => {
  const {
    _id: post_id,
    createdAt,
    author: { nickname },
    content,
    commentCount,
    comments,
    likes,
    scraps
  } = post;

  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsMenuModalOpen((prev: boolean) => !prev);
  };

  const handleClickCommentCount = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsCommentSectionOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["thread-component"]}>
      <div className={styles["profile-image-area"]}>
        <div
          className={styles["profile-image"]}
          style={{
            backgroundImage: `url(${defaultProfile})`,
          }}
        />
        <div className={styles["line"]} />
        <div
          className={styles["three-dots-image"]}
          style={{
            backgroundImage: `url(${threeDotsinThread})`,
          }}
        />
      </div>
      <div className={styles["main"]}>
        <div className={styles["top"]}>
          <span className={styles["author"]}>
            {nickname}
          </span>
          <span className={styles["created-at"]}>
            {formatDateToKST(createdAt)}
          </span>
          <div className={styles["menu-button-wrapper"]}>
            <button
              type="button"
              onClick={handleClickMenuButton}
              className={styles["menu-button"]}
            >
              <GoKebabHorizontal size={20} color="rgb(100,116,139)" />
            </button>
            {isMenuModalOpen && (
              <MenuModal
                setIsMenuModalOpen={setIsMenuModalOpen}
                handleClickEdit={() => {}}
                handleClickDelete={() => {}}
              />
            )}
          </div>
        </div>
        <div className={styles["middle"]}>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        <div className={styles["bottom"]}>
          <button type="button" onClick={handleClickCommentCount}>
            <LuMessageCircleMore size={19} color="rgb(148,163,184)" />
            {commentCount}
          </button>
          <button type="button">
            <FaRegHeart size={18} color="rgb(148,163,184)" />
            {likes.length}
          </button>
          <button type="button">
            <FaBookmark size={15} color="rgb(148,163,184)" />
            {scraps.length}
          </button>
        </div>
        <CommentSection
          isPostPage={false}
          isCommentSectionOpen={isCommentSectionOpen}
          category="thread"
          post_id={post_id}
          comments={comments}
        />
      </div>
    </div>
  );
};

export default Thread;
