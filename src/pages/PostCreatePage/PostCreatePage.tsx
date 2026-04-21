import { useNavigate } from "react-router-dom";

import type { Category } from "@/types/category";
import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { useGetUserMe } from "@/hooks/useGetUserMe";
import { useCreatePost } from "@/components/postForm/components/PostContentForm/hooks/useCreatePost";
import { PostForm } from "@/components/postForm/PostForm";

import styles from "./PostCreatePage.module.scss";


type Props = {
  category: Category;
};

const PostCreatePage = ({ category }: Props) => {
  const navigate = useNavigate();
  const { open: OpenAuthModal } = useAuthModalStore();
  const { mutate, isPending } = useCreatePost(category);
  const { data: userMe } = useGetUserMe();

  if (!userMe) {
    navigate("/");
    OpenAuthModal();
  }

  return (
    <div className={styles["post-create-page-component"]}>
      <PostForm category={category} mutate={mutate} isPending={isPending} />
    </div>
  );
};

export { PostCreatePage };