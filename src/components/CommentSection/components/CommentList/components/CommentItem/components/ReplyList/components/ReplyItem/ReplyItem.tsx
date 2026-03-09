import type { JSX } from "react";
import { useState } from "react";

import type { Category } from "@/types";
import type { Reply } from "@/types/reply";
import { useConfirmModalStore } from "@/zustand";
import { useDeleteReply } from "./hooks";
import { ReplyEditForm } from "./components/ReplyEditForm/ReplyEditForm";
import { CommentHeader } from "../../../CommentHeader/CommetHeader";

import styles from "./ReplyItem.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  reply: Reply;
};

const ReplyItem = ({
  category,
  post_id,
  comment_id,
  reply
}: Props): JSX.Element => {
  const [mode, setMode] = useState<"replyItem" | "replyEditForm">("replyItem");

  const {
    _id: reply_id,
    author,
    createdAt,
    content
  } = reply;

  const togleMode = () => {
    if (mode === "replyItem") {
      setMode("replyEditForm");
    } else {
      setMode("replyItem");
    }
  };

  const { isPending, mutate: deleteReply } = useDeleteReply(
    category,
    post_id,
    comment_id,
    reply_id
  );

  const {
    open: openConfirmModal,
    close: closeConfirmModal
  } = useConfirmModalStore();

  const handleClickDelete = () => {
    openConfirmModal(
      "댓글을 삭제하시겠습니까?",
      closeConfirmModal,
      () => {
        deleteReply();
        closeConfirmModal();
      }
    );
  };

  return (
    <div className={styles["reply-component"]}>
      {mode === "replyEditForm"
        ? (
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
        : (
            <div className={styles["reply"]}>
              <CommentHeader
                author={author}
                createdAt={createdAt}
                handleClickEdit={togleMode}
                isDeletePending={isPending}
                handleClickDelete={handleClickDelete}
              />
              <div className={styles["body"]}>
                <span className={styles["content"]}>
                  {content}
                </span>
              </div>
            </div>
          )
      }
    </div>
  );
};

export { ReplyItem };
