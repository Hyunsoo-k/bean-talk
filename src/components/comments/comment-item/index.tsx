import { type Dispatch, type JSX, type MouseEvent, type SetStateAction, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import MenuModal from "@/components/modal/menu-modal";
import CommentEditForm from "@/components/comments/comment-edit-form";
import ReplyItem from "@/components/comments/reply-item";
import ReplyForm from "@/components/comments/reply-form";

import styles from "./index.module.scss";

type Props = {
  openReplyId: string | null;
  setOpenReplyId: Dispatch<SetStateAction<string | null>>;
};

const CommentItem = ({ openReplyId, setOpenReplyId }: Props): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);

  const hasReply = true;

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen((prev: boolean) => !prev);
  };

  const handleClickReplyButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsReplyFormOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["comment-item-component"]}>
      {isEditFormOpen
        ? <CommentEditForm setIsEditFormOpen={setIsEditFormOpen} />
        : <div className={styles["comment"]}>
            <div
              className={styles["profile-image"]}
              style={{
                backgroundImage: `url(${defaultProfile})`,
              }}
            />
            <div className={styles["main"]}>
              <div className={styles["top"]}>
                <span className={styles["nickname"]}>운영자</span>
                <span className={styles["created-at"]}>2025년 8월 30일</span>
                <div className={styles["menu-button-wrapper"]}>
                  <button
                    type="button"
                    onClick={handleClickMenuButton}
                    className={styles["menu-button"]}
                  >
                    <GoKebabHorizontal size={15} color="rgb(100,116,139)" />
                  </button>
                  {isModalOpen && (
                    <MenuModal
                      setIsMenuModalOpen={setIsModalOpen}
                      setIsEditFormOpen={setIsEditFormOpen}
                    />
                  )}
                </div>
              </div>
              <div className={styles["body"]}>
                <span className={styles["text"]}>
                  커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
                  멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
                </span>
                <button
                  type="button"
                  onClick={handleClickReplyButton}
                  className={styles["create-reply-button"]}
                >
                  답글쓰기
                </button>
              </div>
            </div>
          </div>
      }
      {isReplyFormOpen && <ReplyForm setIsReplyFormOpen={setIsReplyFormOpen} />}
      {hasReply && (
        <ul className={styles["reply-item-box"]}>
          {[1, 2].map(() => (
            <li className={styles["reply-item-wrapper"]}>
              <ReplyItem />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentItem;
