import { Link } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import { formatDate } from "@/utils/formatDate";
import { getUserMe } from "@/api/getUserMe";
import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";
import { useDeletePost } from "./hooks/useDeletePost";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./PostDetailHeader.module.scss";

type Props<T extends Category> = {
  category: Category;
  post: Post<T>;
};

const PostDetailHeader = <T extends Category>({
  category,
  post,
}: Props<T>) => {
  const {
    _id: post_id,
    title,
    author,
    createdAt,
    views,
  } = post;

  const userMe = getUserMe();
  const isMyPost = userMe?._id === author._id;

  const {
    open: openConfirmModal,
    close: closeConfirmModal
  } = useConfirmModalStore();

  const { mutate: deletePost } = useDeletePost(category, post_id);

  const handleDeleteButtonClick = () => {
    openConfirmModal(
      "게시글을 삭제하시겠습니까?",
      closeConfirmModal,
      () => {
        deletePost();
        closeConfirmModal();
      }
    );
  };

  return (
    <div className={styles["post-detail-header-component"]}>
        <h2 className={styles["title"]}>
          {title}
        </h2>
        <div className={styles["control-bar"]}>
          <div
            className={styles["profile-image"]}
            style={{ backgroundImage: `url(${author.profileImageUrl || defaultProfile})` }}
          />
          <span className={styles["nickname"]}>
            {author.nickname}
          </span>
          <div className={styles["boundary-line"]} />
          <span className={styles["created-at"]}>
            {formatDate(createdAt, true)}
          </span>
          <div className={styles["boundary-line"]} />
          <span>
            조회 {views}
          </span>
          {isMyPost && (
            <div className={styles["data-control-button-box"]}>
              <Link
                to={`/categories/${category}/posts/${post_id}/edit`}
                className={styles["edit-button"]}
              >
                수정
              </Link>
              <button
                type="button"
                onClick={handleDeleteButtonClick}
                className={styles["delete-button"]}
              >
                삭제
              </button>
            </div>
          )}
        </div>
    </div>
  );
};

export { PostDetailHeader };