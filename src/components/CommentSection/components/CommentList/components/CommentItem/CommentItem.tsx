import type { MouseEvent } from "react";
import { useState } from "react";

import type { Category } from "@/types/category";
import type { Comment } from "./types";
import { getUserMe } from "@/utils";
import { useAlertModalStore, useConfirmModalStore } from "@/zustand";
import { useActiveComment } from "@/components/CommentSection/zustand";
import { useDeleteComment } from "./hooks";
import { CommentEditForm } from "./components/CommentEditForm";
import { CommentHeader } from "./components/CommentHeader/CommetHeader";
import { ReplyForm } from "./components/ReplyForm";
import { ReplyList } from "./components/ReplyList";

import styles from "./CommentItem.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment: Comment;
};

const CommentItem = ({
  category,
  post_id,
  comment
}: Props) => {
  const [mode, setMode] = useState<"commentItem" | "commentEditForm">("commentItem");
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);

  const {
    _id: comment_id,
    author,
    createdAt,
    content,
    replies,
    deletedHavingReply
  } = comment;

  const userMe = getUserMe();
  const { activeComment, setActiveComment } = useActiveComment();

  const toggleMode = () => {
    if (mode === "commentItem") {
      setMode("commentEditForm");
      setActiveComment(comment_id);
    } else {
      setMode("commentItem");
      setActiveComment(null);
    }
  };

  const { isPending, mutate: deleteComment } = useDeleteComment(
    category,
    post_id,
    comment_id
  );

  const {
    open: openAlertModel,
    close: closeAlertModal
  } = useAlertModalStore();
  const {
    open: openConfirmModal,
    close: closeConfirmModal
  } = useConfirmModalStore();

  const handleClickDelete = () => {
    openConfirmModal(
      "댓글을 삭제하시겠습니까?",
      closeConfirmModal,
      () => {
        deleteComment();
        closeConfirmModal();
      }
    );
  };

  const handleClickReplyButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!userMe) {
      openAlertModel("로그인이 필요한 기능입니다.", closeAlertModal);
      
      return;
    }
    
    setIsReplyFormOpen(true);
    setActiveComment(comment_id);
  };

  return (
    <div className={styles["comment-item-component"]}>
      {mode === "commentEditForm" && activeComment === comment_id
        ? (
          <CommentEditForm
            category={category}
            post_id={post_id}
            comment_id={comment_id}
            setMode={setMode}
            author={author}
            content={content}
          />
        )
        : (
          <div className={styles["comment"]}>
            <CommentHeader
              author={author}
              createdAt={createdAt}
              handleClickEdit={toggleMode}
              isDeletePending={isPending}
              handleClickDelete={handleClickDelete}
              deletedHavingReply={deletedHavingReply}
            />
            <div className={styles["body"]}>
              <p className={styles["content"]}>
                {deletedHavingReply ? "삭제된 댓글입니다" : content}
              </p>
            </div>
            {!deletedHavingReply && (
              <div className={styles["footer"]}>
                <button
                  type="button"
                  onClick={handleClickReplyButton}
                  className={styles["create-reply-button"]}
                >
                  답글쓰기
              </button>
            </div>
            )}
          </div>
        )
      }
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
  );
};

export { CommentItem };
