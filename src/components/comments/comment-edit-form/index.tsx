import { useRef, type Dispatch, type JSX, type MouseEvent, type SetStateAction } from "react";

import styles from "./index.module.scss";

type Props = {
  setIsEditFormOpen: Dispatch<SetStateAction<boolean>>;
};

const CommentEditForm = ({ setIsEditFormOpen }: Props): JSX.Element => {
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
        <span className={styles["nickname"]}>운영자</span>
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
      <button className={styles["submit-button"]}>등록</button>
    </form>
  );
};

export default CommentEditForm;