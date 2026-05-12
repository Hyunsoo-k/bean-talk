import type { MouseEvent } from "react";
import { useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";

import type { Category } from "@/types/category";
import type { Comment as CommentType } from "./types/comment";
import { useGetUserMe } from "@/hooks/useGetUserMe";
import { formatDate } from "@/utils/formatDate";
import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";
import { useDeleteComment } from "./hooks/useDeleteComment";
import { useActiveComment } from "@/components/CommentSection/zustand/useActiveComment";
import { CommentEditForm } from "./components/CommentEditForm";
import { ReplyForm } from "./components/ReplyForm/ReplyForm";
import { ReplyList } from "./components/ReplyList/ReplyList";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./Comment.module.scss";
import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { ActionMenu } from "@/components/ActionMenu/ActionMenu";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";

type Props = {
  category: Category;
  post_id: string;
  comment: CommentType;
};

const Comment = ({ category, post_id, comment }: Props) => {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { activeComment, setActiveComment } = useActiveComment();
  const { open: openFullPageSpinner } = useFullPageSpinnerStore();
  const { mutate: deleteComment } = useDeleteComment(
    category,
    post_id,
    comment._id
  );
  const { open: openAuthModal } = useAuthModalStore();
  const { open: openConfirmModal, close: closeConfirmModal } = useConfirmModalStore();

  const { data: userMe } = useGetUserMe();

  const {
    _id: comment_id,
    author,
    createdAt,
    content,
    replies,
    deletedHavingReply
  } = comment;

  const handleMenuClick = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const handleEditClick = () => {
    setMode("edit");
    setActiveComment(comment_id);
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    openConfirmModal(
      "댓글 삭제",
      "댓글을 정말 삭제하시겠습니까?",
      closeConfirmModal,
      () => {
        openFullPageSpinner();
        deleteComment();
        closeConfirmModal();
      }
    );
    setIsMenuOpen(false);
  };

  const handleClickReplyButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!userMe) {
      openAuthModal();
      
      return;
    }
    
    setIsReplyFormOpen(true);
    setActiveComment(comment_id);
  };

  return (
    <div className={styles["comment-component"]}>
      {mode === "edit" && activeComment === comment_id ? (
        <CommentEditForm
          category={category}
          post_id={post_id}
          comment_id={comment_id}
          setMode={setMode}
          author={author}
          content={content}
        />
      ) : (
        <div className={styles["comment-area"]}>
          <div className={styles["image-area"]}>
            <img src={author.profileImageUrl || defaultProfile} className={styles["profile-image"]} />
          </div>
          <div className={styles["content-area"]}>
            <header className={styles["header"]}>
              <span className={styles["author"]}>
                {author.nickname}
              </span>
              {userMe?._id === author._id && !deletedHavingReply && (
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
                {deletedHavingReply ? "삭제된 댓글입니다" : content}
              </p>
            </div>
            {!deletedHavingReply && (
              <footer className={styles["footer"]}>
                <span className={styles["created-at"]}>
                  {formatDate(createdAt)}
                </span>
                <button
                  type="button"
                  className={styles["create-reply-button"]}
                  onClick={handleClickReplyButton}
                >
                  답글 쓰기
                </button>
              </footer>
            )}
          </div>
        </div>
      )}
      <div className={styles["reply-area"]}>
        {isReplyFormOpen && activeComment === comment_id && (
          <ReplyForm
            category={category}
            post_id={post_id}
            comment_id={comment_id}
            setIsReplyFormOpen={setIsReplyFormOpen}
          />
        )}
          {replies.length > 0 && (
            <ReplyList
              category={category}
              post_id={post_id}
              comment_id={comment_id}
              replies={replies}
            />
          )}
      </div>
    </div>
  );
};

export { Comment };
