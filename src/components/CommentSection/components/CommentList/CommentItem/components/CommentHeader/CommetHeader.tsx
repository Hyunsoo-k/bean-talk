import type { JSX, MouseEvent } from "react";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import { formatDate } from "@/utils";
import { MenuModal } from "@/components/modals";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./CommentHeader.module.scss";

type Props = {
  author: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  createdAt: string;
  handleClickEdit: () => void;
  isDeletePending: boolean;
  handleClickDelete: () => void;
  deletedHavingReply?: boolean;
};

const CommentHeader = ({
  author,
  createdAt,
  handleClickEdit,
  isDeletePending,
  handleClickDelete,
  deletedHavingReply
}: Props): JSX.Element => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  
  const handleClickMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsMenuModalOpen((prev: boolean) => !prev);
  };

  console.log(deletedHavingReply)

  return (
    <div className={styles["comment-header-component"]}>
      <div
        className={styles["profile-image"]}
        style={{ backgroundImage: `url(${defaultProfile})` }}
      />
      <span className={styles["author"]}>
        {author.nickname}
      </span>
      <div className={styles["dot"]} />
      <span className={styles["created-at"]}>
        {formatDate(createdAt)}
      </span>
      {!deletedHavingReply && (
        <div onClick={handleClickMenu} className={styles["menu-wrapper"]}>
          <GoKebabHorizontal size={15} color="rgb(100,116,139)" />
        </div>
      )}
      {isMenuModalOpen && (
          <MenuModal
            setIsMenuModalOpen={setIsMenuModalOpen}
            author={author}
            handleClickEdit={handleClickEdit}
            isDeletePending={isDeletePending}
            handleClickDelete={handleClickDelete}
          />
        )}
    </div>
  );
};

export { CommentHeader };