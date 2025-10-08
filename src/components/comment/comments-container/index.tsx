import type { JSX } from "react";

import type { Comment as CommentType } from "@/types/comment";
import Comment from "@/components/comment/comment";

import styles from "./index.module.scss";

type Props = {
  comments: CommentType[];
};

const CommentsContainer = ({ comments }: Props): JSX.Element => {
  return (
    <ul className={styles["comments-container-component"]}>
      {comments.map((comment: CommentType) => (
        <li key={comment._id} className={styles["comment-wrapper"]}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentsContainer;