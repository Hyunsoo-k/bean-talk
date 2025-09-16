import { type JSX, type MouseEvent, useState } from "react";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import { GoKebabHorizontal } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import MenuModal from "@/components/modal/menu-modal";
import CommentSection from "@/components/comments/comment-section";

import styles from "./index.module.scss";

const ThreadsItem = (): JSX.Element => {
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
    <div className={styles["threads-component"]}>
      <div className={styles["top"]}>
        <div
          className={styles["profile-image"]}
          style={{ backgroundImage: `url(${defaultProfile})` }}
        />
        <span className={styles["nickname"]}>운영자</span>
        <span className={styles["created-at"]}>2025년 8월 30일</span>
        <div className={styles["menu-button-wrapper"]}>
          <button type="button" onClick={handleClickMenuButton} className={styles["menu-button"]}>
            <GoKebabHorizontal size={20} color="rgb(100,116,139)" />
          </button>
          {isMenuModalOpen && (
            <MenuModal
              setIsMenuModalOpen={setIsMenuModalOpen}
              setIsEditFormOpen={setIsEditFormOpen}
            />
          )}
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["text"]}>
          커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
          멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다. 카페 구석 창가에
          앉아 바라보는 도시의 풍경 속에서도 커피는 늘 곁에 있다. 따뜻한 한 잔의 커피가 만들어내는 시간은 언제나
          특별하다. 커피잔에 스며든 온기는 손끝을 따뜻하게 감싸며 마음의 긴장을 풀어준다. 고소한 향이 퍼지는 순간,
          어제의 피로와 내일의 걱정은 잠시 뒤로 물러난다. 카푸치노의 부드러운 거품은 하루를 달콤하게 시작하게 하고,
          아메리카노의 깊은 쌉싸름함은 생각을 정리하게 한다. 커피는 언제나 같은 자리에서 다르면서도 익숙한 풍경을
          만들어내며, 그 속에서 사람들은 이야기를 나누고, 스스로와 대화하며, 다시 일상을 이어간다.
        </div>
        <div className={styles["bottom"]}>
          <button type="button" onClick={handleClickCommentCount}>
            <LuMessageCircleMore size={20} color="rgb(148,163,184)" />3
          </button>
          <button type="button">
            <FaRegHeart size={20} color="rgb(148,163,184)" />3
          </button>
          <button type="button">
            <FaBookmark size={17} color="rgb(148,163,184)" />0
          </button>
        </div>
      </div>
      <CommentSection
        isPostPage={false}
        isCommentSectionOpen={isCommentSectionOpen}
      />
    </div>
  );
};

export default ThreadsItem;
