import type { JSX } from "react";

import type { Category } from "@/types/category";
import { useGetComments } from "./hooks/useGetComments";
import { CommentList } from "./components/CommentList/CommentList";
import { CommentForm } from "./components/CommentForm/CommentForm";

import styles from "./CommentSection.module.scss";

type Props = {
  category: Category;
  post_id: string;
  noPadding?: boolean;
};

const CommentSection = ({ category, post_id, noPadding }: Props): JSX.Element => {
  const { data: queryData, isLoading } = useGetComments(category, post_id);

  if (isLoading) {
    return <div></div>
  }

  return (
    <div className={`${styles["comment-section-component"]} ${noPadding ? styles["no-padding"] : ""}`}>
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
