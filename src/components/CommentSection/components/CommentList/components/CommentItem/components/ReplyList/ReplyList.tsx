import type { JSX } from "react";

import type { Reply } from "@/types/reply";
import { ReplyItem } from "./components/ReplyItem/ReplyItem";

import styles from "./ReplyList.module.scss";
import type { Category } from "@/types";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  replies: Reply[];
};

const ReplyList = ({
  category,
  post_id,
  comment_id,
  replies
}: Props): JSX.Element => {
  return (
    <ul className={styles["reply-list-component"]}>
      {replies.map((reply: Reply) => (
        <li key={reply._id} className={styles["reply-item-wrapper"]}>
          <ReplyItem
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