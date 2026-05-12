import type { Dispatch, MouseEvent, SetStateAction } from "react";
import {  useRef } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types/category";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";
import { useCreateReply } from "./hooks/useCreateReply";
import { useActiveComment } from "@/components/CommentSection/zustand/useActiveComment";

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
}: Props) => {
  const replyFormRef = useRef<HTMLFormElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { setActiveComment } = useActiveComment();
  const { open: openFullPageSpinner } = useFullPageSpinnerStore();
  
  const {
    register,
    formState,
    handleSubmit: handleRHFSubmit
  } = useForm<Record<"content", string>>({ mode: "onChange" });

  const { isPending, mutate: create } = useCreateReply(
    category,
    post_id,
    comment_id,
    setIsReplyFormOpen
  );

  const handleSubmit = (data: Record<"content", string>) => {
    openFullPageSpinner();
    const requestBody = data;
    create(requestBody);
  };

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  const handleCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActiveComment(null);
    setIsReplyFormOpen(false);
  };

  return (
    <form
      ref={replyFormRef}
      onSubmit={handleRHFSubmit(handleSubmit)}
      className={styles["reply-form-component"]}
    >
      <textarea
        placeholder="답글을 입력해 주세요."
        spellCheck={false}
        onInput={handleResizeTextArea}
        {...register("content", {
          required: "필수 값 입니다.",
          maxLength: 100,
        })}
        ref={(el) => {
          register("content").ref(el);
          textAreaRef.current = el;
        }}
        className={styles["input"]}
      />
      <footer className={styles["footer"]}>
        {formState.errors.content && (
          <small className={styles["error-message"]}>
            {formState.errors.content?.message as string}
          </small>
        )}
        <button
          type="button"
          onClick={handleCancelClick}
          className={`${styles["button"]} ${styles["cancel"]}`}
        >
          취소
        </button>
        <button
          disabled={isPending}
          className={`${styles["button"]} ${styles["submit"]}`}
        >
          등록
        </button>
      </footer>
    </form>
  );
};

export { ReplyForm };