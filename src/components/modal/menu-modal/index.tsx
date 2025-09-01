import { type Dispatch, type JSX, type MouseEvent, type SetStateAction, useEffect, useRef } from "react";

import styles from "./index.module.scss";

type Props = {
  setIsMenuModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditFormOpen: Dispatch<SetStateAction<boolean>>;
};

const MenuModal = ({ setIsMenuModalOpen, setIsEditFormOpen }: Props): JSX.Element => {
  const modalRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (!modalRef.current) return;
      const clickTarget = e.target as HTMLElement;

      if (!modalRef.current.contains(clickTarget)) setIsMenuModalOpen(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickEdit = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    setIsEditFormOpen(true);
    setIsMenuModalOpen(false);
  };

  return (
    <ul ref={modalRef} className={styles["menu-box-modal-component"]}>
      <li onClick={handleClickEdit}>수정</li>
      <li>삭제</li>
      <li>신고</li>
      <li>URL 복사</li>
    </ul>
  );
};

export default MenuModal;
