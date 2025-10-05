import type { JSX, MouseEvent } from "react";
import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import MenuModal from "@/components/modal/menu-modal";
import CommentSection from "@/components/comments/comment-section";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import threeDotsinThread from "@/assets/images/three-dots-in-thread.png"
import styles from "./index.module.scss";

const Thread = (): JSX.Element => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState<boolean>(false);

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuModalOpen((prev: boolean) => !prev);
  };

  const handleClickCommentCount = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCommentSectionOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["thread-component"]}>
      <div className={styles["profile-image-area"]}>
        <div
          className={styles["profile-image"]}
          style={{
            backgroundImage: `url(${defaultProfile})`
          }}
        />
        <div className={styles["line"]}/>
        <div
          className={styles["three-dots-image"]}
          style={{
            backgroundImage: `url(${threeDotsinThread})`
          }}
        />
      </div>
      <div className={styles["main"]}>
        <div className={styles["top"]}>
          <span className={styles["author"]}>
            운영자
          </span>
          <span className={styles["created-at"]}>
            2025년 8월 30일
          </span>
          <div className={styles["menu-button-wrapper"]}>
            <button
              type="button"
              onClick={handleClickMenuButton}
              className={styles["menu-button"]}
            >
              <GoKebabHorizontal size={20} color="rgb(100,116,139)" />
            </button>
            {isMenuModalOpen && (
              <MenuModal setIsMenuModalOpen={setIsMenuModalOpen} setIsEditFormOpen={setIsEditFormOpen} />
            )}
          </div>
        </div>
        <div className={styles["middle"]}>
          <p className={styles["content"]}>
            커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
            멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다. 카페 구석 창가에
            앉아 바라보는 도시의 풍경 속에서도 커피는 늘 곁에 있다.
          </p>
        </div>
        <div className={styles["bottom"]}>
          <button type="button" onClick={handleClickCommentCount}>
            <LuMessageCircleMore size={19} color="rgb(148,163,184)" />
            3
          </button>
          <button type="button">
            <FaRegHeart size={18} color="rgb(148,163,184)" />
            3
          </button>
          <button type="button">
            <FaBookmark size={15} color="rgb(148,163,184)" />
            0
          </button>
        </div>
      </div>
      <CommentSection isPostPage={false} isCommentSectionOpen={isCommentSectionOpen} />
    </div>
  );
};

export default Thread;
