import type { JSX } from "react";

import type { Category } from "@/types/category";
import type { Comment as CommentType } from "@/types/comment";
import Comment from "@/components/comment/comment";

import styles from "./index.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comments: CommentType[];
};

const CommentsContainer = ({
  category,
  post_id,
  comments
}: Props): JSX.Element => {
  return (
    <ul className={styles["comments-container-component"]}>
      {comments.map((comment: CommentType) => (
        <li key={comment._id} className={styles["comment-wrapper"]}>
          <Comment
            category={category}
            post_id={post_id}
            comment={comment}
          />
        </li>
      ))}
    </ul>
  );
};

export default CommentsContainer;