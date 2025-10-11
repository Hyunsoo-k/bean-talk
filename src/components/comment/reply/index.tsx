import type { JSX, MouseEvent } from "react";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import type { Reply as ReplyType } from "@/types/reply";
import formatDateToKST from "@/utils/format-date-to-kst";
import MenuModal from "@/components/modal/menu-modal";
import ReplyEditForm from "@/components/comment/reply-edit-form";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./index.module.scss";

type Props = {
  reply: ReplyType;
};

const Reply = ({ reply }: Props): JSX.Element => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);

  const {
    author,
    createdAt,
    content
  } = reply;

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuModalOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["reply-component"]}>
      {isEditFormOpen
        ? (<ReplyEditForm setIsEditFormOpen={setIsEditFormOpen} />)
        : (
            <div className={styles["reply"]}>
              <div className={styles["top"]}>
                <div
                  className={styles["profile-image"]}
                  style={{
                    backgroundImage: `url(${defaultProfile})`,
                  }}
                />
                <span className={styles["author"]}>
                  {author.nickname}
                </span>
                <span className={styles["created-at"]}>
                  {formatDateToKST(createdAt)}
                </span>
                <div className={styles["menu-button-wrapper"]}>
                  <button
                    type="button"
                    onClick={handleClickMenuButton}
                    className={styles["menu-button"]}
                  >
                    <GoKebabHorizontal size={15} color="rgb(100,116,139)" />
                  </button>
                  {isMenuModalOpen && (
                    <MenuModal
                      setIsMenuModalOpen={setIsMenuModalOpen}
                      handleClickEdit={() => {}}
                      handleClickDelete={() => {}}
                    />
                  )}
                </div>
              </div>
              <div className={styles["middle"]}>
                <span className={styles["content"]}>
                  {content}
                </span>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default Reply;
