import type {
  Dispatch,
  JSX,
  MouseEvent,
  SetStateAction
} from "react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types/category";
import { getUserMe } from "@/utils";
import { useCreateReply } from "./hooks/useCreateReply";

import styles from "./ReplyForm.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  setIsReplyFormOpen: Dispatch<SetStateAction<boolean>>;
};

const ReplyForm = ({
  category,
  post_id,
  comment_id,
  setIsReplyFormOpen
}: Props): JSX.Element => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const replyFormRef = useRef<HTMLFormElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const {
    register,
    formState,
    reset,
    handleSubmit: handleRHFSubmit
  } = useForm<Record<"content", string>>({ mode: "onChange" });

  const { isPending, mutate: create } = useCreateReply(
    category,
    post_id,
    comment_id,
    setIsReplyFormOpen
  );

  useEffect(() => {
    const replyFormElement = replyFormRef.current;
    if (!replyFormElement) {
      return;
    }

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const clickTarget = e.target as HTMLElement;

      if (!replyFormElement.contains(clickTarget)) {
        setIsReplyFormOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsReplyFormOpen]);

  const handleSubmit = (data: Record<"content", string>) => {
    const requestBody = data;
    create(requestBody);
  };

  const handleSubmitError = () => {

  };

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
    <form
      ref={replyFormRef}
      onSubmit={handleRHFSubmit(handleSubmit, handleSubmitError)}
      className={`
        ${styles["reply-form-component"]} 
        ${isInputFocused ? styles["--focused"] : ""}
      `}
    >
      <textarea
        placeholder="답글을 입력해 주세요."
        spellCheck={false}
        onFocus={() => setIsInputFocused(true)}
        onInput={handleResizeTextArea}
        {...register("content", {
          required: "필수 값 입니다.",
          maxLength: 100,
          onBlur: () => setIsInputFocused(false),
        })}
        ref={(el) => {
          register("content").ref(el);
          textAreaRef.current = el;
        }}
        className={styles["reply-input"]}
      />
      <div className={styles["bottom"]}>
        {formState.errors.content && (
          <small className={styles["warning-message"]}>
            {formState.errors.content?.message as string}
          </small>
        )}
        <button
          type="button"
          onClick={handleClickCancelReplyButton}
          className={styles["cancel-button"]}
        >
          취소
        </button>
        <button disabled={isPending} className={styles["submit-button"]}>
          등록
        </button>
      </div>
    </form>
  );
};

export { ReplyForm };