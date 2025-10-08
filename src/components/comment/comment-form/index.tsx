import { useRef, type JSX } from "react";

import styles from "./index.module.scss";

const CommentForm = (): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  return (
    <form className={styles["comment-form-component"]}>
      <textarea
        placeholder="댓글을 입력해 주세요."
        spellCheck={false}
        ref={textAreaRef}
        onInput={handleResizeTextArea}
      />
      <button className={styles["comment-submit-button"]}>등록</button>
    </form>
  );
};

export default CommentForm;
