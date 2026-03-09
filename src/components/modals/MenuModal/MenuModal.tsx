import type { Dispatch, JSX, SetStateAction } from "react";
import { useEffect, useRef } from "react";

import { getUserMe } from "@/utils";

import styles from "./MenuModal.module.scss";

type Props = {
  setIsMenuModalOpen: Dispatch<SetStateAction<boolean>>;
  author: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  }
  handleClickEdit: () => void;
  isDeletePending: boolean;
  handleClickDelete: () => void;
};

const MenuModal = ({
  setIsMenuModalOpen,
  author,
  handleClickEdit,
  isDeletePending,
  handleClickDelete
}: Props): JSX.Element => {
  const modalRef = useRef<HTMLUListElement | null>(null);

  const userMe = getUserMe();

  const { _id: author_id } = author;

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (!modalRef.current) {
        return;
      }

      const $clickTarget = e.target as HTMLElement;

      if (!modalRef.current.contains($clickTarget)) {
        setIsMenuModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsMenuModalOpen]);

  return (
    <ul
      ref={modalRef}
      className={styles["menu-modal-component"]}
    >
      {userMe?._id === author_id && (
        <>
          <li>
            <button type="button" onClick={handleClickEdit}>
              수정
            </button>
          </li>
            <li>
            <button
              type="button"
              disabled={isDeletePending}
              onClick={handleClickDelete}
            >
              삭제
            </button>
          </li>
        </>
      )}
      <li>
        <button type="button">
          신고
        </button>
      </li>
    </ul>
  );
};

export { MenuModal };
