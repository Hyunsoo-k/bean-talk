import type { JSX } from "react";
import { useState } from "react";

import type { Category } from "@/types/category";
import { useGetComments } from "./hooks";
import { CommentList } from "./components/CommentList";
import { CommentForm } from "./components/CommentForm";

import styles from "./CommentSection.module.scss";

type Props = {
  category: Category;
  post_id: string;
};

const CommentSection = ({ category, post_id }: Props): JSX.Element => {
  const [currentOpenForm_id, setCurrentOpenForm_id] = useState<string | null>(null);

  const { data: queryData, isLoading } = useGetComments(category, post_id);

  if (isLoading) {
    return <div></div>
  }

  return (
    <div  className={styles["comment-section-component"]}>
      <CommentForm category={category} post_id={post_id} />
      <CommentList
          category={category}
          post_id={post_id}
          comments={queryData}
        />
    </div>
  );
};

export { CommentSection };
