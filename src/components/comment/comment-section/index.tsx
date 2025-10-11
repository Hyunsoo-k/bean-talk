import type { JSX } from "react";

import type { Category } from "@/types/category";
import type { Comment } from "@/types/comment";
import CommentForm from "@/components/comment/comment-form";
import CommentsContainer from "@/components/comment/comments-container";

import styles from "./index.module.scss";

type Props = {
  isPostPage: boolean;
  isCommentSectionOpen?: boolean;
  category: Category;
  post_id: string;
  comments: Comment[]
};

const CommentSection = ({
  isPostPage,
  isCommentSectionOpen,
  category,
  post_id,
  comments
}: Props): JSX.Element => {

  return (
    <div
      className={styles["comment-section-component"]}
      style={{
        display: isPostPage || isCommentSectionOpen
          ? "block"
          : "none"
      }}
    >
      <CommentForm post_id={post_id} />
      <CommentsContainer
          category={category}
          post_id={post_id}
          comments={comments}
        />
    </div>
  );
};

export default CommentSection;
