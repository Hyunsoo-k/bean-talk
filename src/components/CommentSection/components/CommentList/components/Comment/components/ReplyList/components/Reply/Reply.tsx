import { useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";

import type { Category } from "@/types/category";
import type { Reply as ReplyType } from "@/types/reply";
import { useGetUserMe } from "@/hooks/useGetUserMe";
import { formatDate } from "@/utils/formatDate";
import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";
import { useDeleteReply } from "./hooks/useDeleteReply";
import { useActiveComment } from "@/components/CommentSection/zustand/useActiveComment";
import { ReplyEditForm } from "./components/ReplyEditForm/ReplyEditForm";
import { ActionMenu } from "@/components/ActionMenu/ActionMenu";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./Reply.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  reply: ReplyType;
};

const Reply = ({ category, post_id, comment_id,  reply }: Props) => {
  const {
    _id: reply_id,
    author,
    createdAt,
    content
  } = reply;

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { activeComment, setActiveComment } = useActiveComment();
  const { mutate: deleteReply } = useDeleteReply(
    category,
    post_id,
    comment_id,
    reply_id
  );
  const { open: openConfirmModal, close: closeConfirmModal } = useConfirmModalStore();

  const { data: userMe } = useGetUserMe();

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleEditClick = () => {
    setMode("edit");
    setActiveComment(reply_id);
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    openConfirmModal(
      "답글 삭제",
      "답글을 정말 삭제하시겠습니까?",
      closeConfirmModal,
      () => {
        deleteReply();
        closeConfirmModal();
      }
    );
  };

  if (mode === "edit" && activeComment === reply_id) {
    return (
      <ReplyEditForm
        category={category}
        post_id={post_id}
        comment_id={comment_id}
        reply_id={reply_id}
        setMode={setMode}
        author={author}
        content={content}
      />
    )
  }

  return (
    <div className={styles["reply-component"]}>
      <div className={styles["image-area"]}>
        <img src={author.profileImageUrl || defaultProfile} className={styles["profile-image"]} />
      </div>
      <div className={styles["content-area"]}>
        <header className={styles["header"]}>
          <span className={styles["author"]}>
            {author.nickname}
          </span>
          {userMe?._id === author._id && (
            <div className={styles["menu-area"]}>
              <button
                className={styles["menu-button"]}
                onClick={handleMenuClick}
              >
                <VscKebabVertical className={styles["menu-icon"]} />
              </button>
              {isMenuOpen && (
                <ActionMenu
                  setIsMenuOpen={setIsMenuOpen}
                  onClickEdit={handleEditClick}
                  onClickDelete={handleDeleteClick}
                />
              )}
            </div>
          )}
        </header>
        <div className={styles["body"]}>
          <p className={styles["content"]}>
            {content}
          </p>
        </div>
        <footer className={styles["footer"]}>
            <span className={styles["created-at"]}>
              {formatDate(createdAt)}
            </span>
          </footer>
      </div>
    </div>
  );
};

export { Reply };
