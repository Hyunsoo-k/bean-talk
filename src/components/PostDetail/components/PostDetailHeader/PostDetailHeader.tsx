import type { JSX } from "react";
import { Link } from "react-router-dom";

import type { Category, Post } from "@/types";
import { formatDate, getUserMe } from "@/utils";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./PostDetailHeader.module.scss";

type Props<T extends Category> = {
  category: Category;
  postDetail: Post<T>;
};

const PostDetailHeader = <T extends Category>({
  category,
  postDetail
}: Props<T>): JSX.Element => {
  const {
    _id: post_id,
    title,
    author,
    createdAt,
    views,
  } = postDetail;

  const userMe = getUserMe();
  const isMyPost = userMe?._id === author._id;

  const handleClickDelete = () => {

  };

  return (
    <div className={styles["post-detail-header-component"]}>
        <h2 className={styles["title"]}>
          {title}
        </h2>
        <div className={styles["control-bar"]}>
          <div
            className={styles["profile-image"]}
            style={{ backgroundImage: `url(${defaultProfile})` }}
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
              <Link to={`/categories/${category}/posts/${post_id}/edit`}>
                수정
              </Link>
              <button type="button" onClick={handleClickDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
    </div>
  );
};

export { PostDetailHeader };