import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoKebabHorizontal } from "react-icons/go";


import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils/formatDate";
import { useGetUserMe } from "@/hooks/useGetUserMe";;
import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";
import { useDeletePost } from "./hooks/useDeletePost";
import { BreadCrumb } from "@/components/BreadCrumb/BreadCrumb";
import { ActionMenu } from "@/components/ActionMenu/ActionMenu";

import styles from "./PostDetailHeader.module.scss";

type Props<T extends Category> = {
  category: Category;
  post: Post<T>;
};

const PostDetailHeader = <T extends Category>({ category, post }: Props<T>) => {
  const {
    _id: post_id,
    thumbnailUrl,
    title,
    author,
    createdAt,
  } = post;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { open: openConfirmModal, close: closeConfirmModal } = useConfirmModalStore();
  const { mutate: deletePost } = useDeletePost(category, post_id);
  const { data: userMe } = useGetUserMe();
  const isMyPost = userMe?._id === author._id;

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleEditClick = () => {
    navigate(`/categories/${category}/posts/${post_id}/edit`);
  };

  const handleDeleteClick = () => {
    openConfirmModal(
      "게시글 삭제",
      "게시글을 정말 삭제하시겠습니까?",
      closeConfirmModal,
      () => {
        deletePost();
        closeConfirmModal();
      }
    );
  };

  return (
    <div
      className={`${styles["post-detail-header-component"]} ${thumbnailUrl ? styles["has-thumbnail"] : ""}`}
      style={{ backgroundImage: `${thumbnailUrl ? `url(${thumbnailUrl})`: ""}`}}
    >
        <div className={styles["header-top"]}>
          <BreadCrumb category={category} usage="postDetail" />
          {isMyPost && (
            <div className={styles["menu-area"]}>
              <button
                type="button"
                onClick={handleMenuClick}
                className={styles["menu-button"]}
              >
                <GoKebabHorizontal className={styles["menu-icon"]} />
              </button>
              {isMenuOpen && (
                <ActionMenu
                  setIsMenuOpen={setIsMenuOpen}
                  onClickEdit={handleEditClick}
                  onClickDelete={handleDeleteClick}
                />
              )}
            </div>
          )}
        </div>
        <h2 className={styles["title"]}>
          {title}
        </h2>
        <div className={styles["post-detail-data"]}>
          <span className={styles["author"]}>
            {author.nickname}
          </span>
          <span className={styles["created-at"]}>
            {formatDate(createdAt)}
          </span>
        </div>
    </div>
  );
};

export { PostDetailHeader };