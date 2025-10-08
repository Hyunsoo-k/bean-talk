import type { JSX } from "react";

import type { Comment } from "@/types/comment";
import CommentForm from "@/components/comment/comment-form";
import CommentsContainer from "@/components/comment/comments-container";

import styles from "./index.module.scss";

type Props = {
  isPostPage: boolean;
  isCommentSectionOpen?: boolean;
  comments: Comment[]
};

const CommentSection = ({ isPostPage, isCommentSectionOpen, comments }: Props): JSX.Element => {

  return (
    <div
      className={styles["comment-section-component"]}
      style={{
        display: isPostPage || isCommentSectionOpen
          ? "block"
          : "none"
      }}
    >
      <CommentForm />
      <CommentsContainer comments={comments} />
    </div>
  );
};

export default CommentSection;
