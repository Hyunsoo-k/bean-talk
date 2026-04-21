import type { JSX } from "react";

import type { Category } from "@/types/category";
import type { Reply as ReplyType } from "@/types/reply";
import { Reply } from "./components/Reply/Reply";

import styles from "./ReplyList.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  replies: ReplyType[];
};

const ReplyList = ({
  category,
  post_id,
  comment_id,
  replies
}: Props): JSX.Element => {
  return (
    <ul className={styles["reply-list-component"]}>
      {replies.map((reply: ReplyType) => (
        <li key={reply._id} className={styles["reply-item-wrapper"]}>
          <Reply
            category={category}
            post_id={post_id}
            comment_id={comment_id}
            reply={reply}
          />
        </li>
      ))}
    </ul>
  );
};

export { ReplyList };