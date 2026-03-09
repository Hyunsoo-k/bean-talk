import type { JSX } from "react";

import type { Category } from "@/types/category";
import type { Comment as CommentType } from "../../types";
import { CommentItem } from "./components/CommentItem";

import styles from "./CommentList.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comments: CommentType[];
};

const CommentList = ({
  category,
  post_id,
  comments
}: Props): JSX.Element => {
  return (
    <ul className={styles["comment-list-component"]}>
      {comments.map((comment: CommentType) => (
        <li key={comment._id} className={styles["comment-wrapper"]}>
          <CommentItem
            category={category}
            post_id={post_id}
            comment={comment}
          />
        </li>
      ))}
    </ul>
  );
};

export { CommentList };