import type { Dispatch, SetStateAction } from "react";
import { useRef } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";

import styles from "./ActionMenu.module.scss";

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  onClickEdit: () => void;
  onClickDelete: () => void;
};

const ActionMenu = ({ setIsMenuOpen, onClickEdit, onClickDelete }: Props) => {
  const targetRef = useRef<HTMLUListElement | null>(null);
  
  useClickOutside(targetRef, () => setIsMenuOpen(false));

  return (
    <ul ref={targetRef} className={styles["action-menu-component"]}>
      <li className={styles["menu-wrapper"]}>
        <button type="button" onClick={onClickEdit} className={styles["button"]}>
          수정
        </button>
      </li>
      <li className={styles["menu-wrapper"]}>
        <button type="button" onClick={onClickDelete} className={styles["button"]}>
          삭제
        </button>
      </li>
    </ul>
  );
};

export { ActionMenu };