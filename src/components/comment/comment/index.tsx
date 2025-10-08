import type { JSX, MouseEvent } from "react";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import type { Comment } from "@/types/comment";
import type { Reply as ReplyType} from "@/types/reply";
import formatDateToKST from "@/utils/format-date-to-kst";
import MenuModal from "@/components/modal/menu-modal";
import CommentEditForm from "@/components/comment/comment-edit-form";
import Reply from "@/components/comment/reply";
import ReplyForm from "@/components/comment/reply-form";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./index.module.scss";

type Props = {
  comment: Comment;
};

const Comment = ({ comment }: Props): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);

  const hasReply = true;

  const {
    author,
    createdAt,
    content,
    replies,
    deletedHavingReply
  } = comment;

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen((prev: boolean) => !prev);
  };

  const handleClickReplyButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsReplyFormOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["comment-component"]}>
      {isEditFormOpen
        ? (
          <CommentEditForm
            setIsEditFormOpen={setIsEditFormOpen}
            author={author}
            content={content}
          />
        )
        : (
            <div className={styles["comment"]}>
              <div className={styles["top"]}>
                <div
                  className={styles["profile-image"]}
                  style={{ backgroundImage: `url(${defaultProfile})` }}
                />
                <span className={styles["author"]}>
                  {author.nickname}
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
                    <GoKebabHorizontal size={15} color="rgb(100,116,139)" />
                  </button>
                  {isModalOpen && (
                    <MenuModal
                      setIsMenuModalOpen={setIsModalOpen}
                      setIsEditFormOpen={setIsEditFormOpen}
                    />
                  )}
                </div>
              </div>
              <div className={styles["middle"]}>
                <p className={styles["content"]}>
                  {deletedHavingReply ? "삭제된 댓글입니다" : content}
                </p>
                <button
                  type="button"
                  onClick={handleClickReplyButton}
                  className={styles["create-reply-button"]}
                >
                  답글쓰기
                </button>
              </div>
          </div>
        )
      }
      {isReplyFormOpen && (<ReplyForm setIsReplyFormOpen={setIsReplyFormOpen} />)}
      {replies.length > 0 && (
        <ul className={styles["reply-container"]}>
          {replies.map((reply: ReplyType) => (
            <li className={styles["reply-wrapper"]}>
              <Reply reply={reply} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comment;
