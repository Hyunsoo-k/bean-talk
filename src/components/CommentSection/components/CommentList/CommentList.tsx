import type { Category } from "@/types/category";
import type { Comment as CommentType } from "../../types/comment";
import { Comment } from "./components/Comment/Comment";

import styles from "./CommentList.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comments: CommentType[];
};

const CommentList = ({ category, post_id, comments}: Props)=> {
  return (
    <ul className={styles["comment-list-component"]}>
      {comments.map((comment: CommentType) => (
        <li key={comment._id} className={styles["comment-rapper"]}>
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

export { CommentList };