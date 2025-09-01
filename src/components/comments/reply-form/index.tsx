import { useRef, type Dispatch, type JSX, type MouseEvent, type SetStateAction } from "react";

import styles from "./index.module.scss";

type Props = {
  setIsReplyFormOpen: Dispatch<SetStateAction<boolean>>;
};

const ReplyForm = ({ setIsReplyFormOpen }: Props): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  const handleClickCancelReplyButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsReplyFormOpen(false);
  };

  return (
    <form className={styles["reply-form-component"]}>
      <textarea
        placeholder="댓글을 입력해 주세요."
        spellCheck={false}
        ref={textAreaRef}
        onInput={handleResizeTextArea}
      />
      <button
        type="button"
        onClick={handleClickCancelReplyButton}
        className={styles["cancel-button"]}
      >
        취소
      </button>
      <button className={styles["submit-button"]}>등록</button>
    </form>
  );
};

export default ReplyForm;