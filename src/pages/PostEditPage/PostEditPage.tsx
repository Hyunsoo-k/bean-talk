import { useLocation } from "react-router-dom";

import type { Category } from "@/types/category";
import { extractPost_id } from "@/utils/extractPost_id";
import { useGetPostDetail } from "@/hooks/useGetPostDetail";
import { useEditPost } from "@/components/postForm/components/PostContentForm/hooks/useEditPost";
import { PostForm } from "@/components/postForm/PostForm";

import styles from "./PostEditPage.module.scss";

type Props = {
  category: Category;
};

const PostEditPage = ({ category }: Props) => {
  const { pathname } = useLocation();
  const post_id = extractPost_id(pathname);
  const { data } = useGetPostDetail(category, post_id);
  const { mutate, isPending } = useEditPost(category, post_id);

  return (
    <div className={styles["post-edit-page-component"]}>
      <PostForm
        category={category}
        mutate={mutate}
        isPending={isPending}
        initialData={data}
      />
    </div>
  );
};

export { PostEditPage };