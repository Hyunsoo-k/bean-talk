import { useState, type JSX, type MouseEvent } from "react";
import { PiArrowElbowDownRight } from "react-icons/pi";
import { GoKebabHorizontal } from "react-icons/go";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import MenuModal from "@/components/modal/menu-modal";
import ReplyEditForm from "@/components/comments/reply-edit-form";

import styles from "./index.module.scss";

const ReplyItem = (): JSX.Element => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);

  const handleClickMenuButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuModalOpen((prev: boolean) => !prev);
  };

  return (
    <div className={styles["reply-item-component"]}>
      {isEditFormOpen
        ? <ReplyEditForm setIsEditFormOpen={setIsEditFormOpen} />
        : <>
            <PiArrowElbowDownRight size={20} color="rgb(100,116,139)" />
            <div
              className={styles["profile-image"]}
              style={{
                backgroundImage: `url(${defaultProfile})`,
              }}
            />
            <div className={styles["main"]}>
              <div className={styles["top"]}>
                <span className={styles["nickname"]}>운영자운영자</span>
                <span className={styles["created-at"]}>2025년 8월 30일</span>
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
                      setIsEditFormOpen={setIsEditFormOpen}
                    />
                  )}
                </div>
              </div>
              <div className={styles["body"]}>
                <span>
                  커피는 단순한 음료가 아니라 작은 휴식이자 대화의 시작점이다. 갓 갈아낸 원두의 향은 바쁜 일상 속에서 잠시
                  멈춤을 선물하고, 뜨거운 에스프레소의 농도는 집중을, 부드러운 라떼의 거품은 위로를 건넨다.
                </span>
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default ReplyItem;
