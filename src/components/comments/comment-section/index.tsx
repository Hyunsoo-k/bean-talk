import { type JSX, useState } from "react";

import CommentForm from "@/components/comments/comment-form";
import CommentItem from "@/components/comments/comment-item";

import styles from "./index.module.scss";

type Props = {
  isPostPage: boolean;
  isCommentSectionOpen?: boolean;
};

const CommentSection = ({ isPostPage, isCommentSectionOpen }: Props): JSX.Element => {
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);

  return (
    <div
      className={styles["comment-section-component"]}
      style={{ display: isPostPage || isCommentSectionOpen ? "block" : "none" }}
    >
      <CommentForm />
      <ul className={styles["comment-item-box"]}>
        {[1, 2].map(() => (
          <li className={styles["comment-item-wrapper"]}>
            <CommentItem openReplyId={openReplyId} setOpenReplyId={setOpenReplyId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
