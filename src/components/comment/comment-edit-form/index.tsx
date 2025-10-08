import type { Dispatch, JSX, MouseEvent, SetStateAction } from "react";
import { useRef } from "react";

import styles from "./index.module.scss";

type Props = {
  setIsEditFormOpen: Dispatch<SetStateAction<boolean>>;
  author: {
    _id: string;
    nickname: string;
  };
  content: string;
};

const CommentEditForm = ({
  setIsEditFormOpen,
  author,
  content
}: Props): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  const handleClickCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditFormOpen(false);
  };
  
  return (
    <form className={styles["comment-edit-form-component"]}>
      <div className={styles["top"]}>
        <span className={styles["nickname"]}>
          {author.nickname}
        </span>
      </div>
      <textarea
        placeholder="댓글을 입력해 주세요."
        spellCheck={false}
        ref={textAreaRef}
        onInput={handleResizeTextArea}
      />
      <button
        type="button"
        onClick={handleClickCancel}
        className={styles["cancel-button"]}
      >
        취소
      </button>
      <button className={styles["submit-button"]}>
        등록
      </button>
    </form>
  );
};

export default CommentEditForm;