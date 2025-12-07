import type { JSX } from "react";
import type { FieldErrors } from "react-hook-form";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types";
import { QUERY_KEYS } from "@/constants";
import { useAlertModal } from "@/zustand";
import { queryClient } from "@/constants/queryClient";
import { useCreateComment } from "./hooks/useCreateComment";

import styles from "./CommentForm.module.scss";

type Props = {
  category: Category;
  post_id: string;
};

const CommentForm = ({ category, post_id }: Props): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    register,
    formState,
    reset,
    handleSubmit: handleRHFSubmit
  } = useForm<Record<"content", string>>({ mode: "onChange" });

  const { isPending, mutate: create } = useCreateComment(
    category,
    post_id,
    reset,
    setIsInputFocused
  );
  
  const { open: openAlertModal, close: closeAlertModal } = useAlertModal();

  const userMe = queryClient.getQueryData(QUERY_KEYS.userMe);

  const handleSubmit = (formValue: Record<"content", string>) => {
    if (!userMe) {
      openAlertModal("로그인이 필요한 기능입니다.", closeAlertModal);
      return;
    }

    const { content } = formValue;
    const requestBody = { content };
    create(requestBody);

  };

  const handleSubmitError = (errors: FieldErrors<Record<"content", string>>) => {
    console.log(errors)
  };

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  return (
    <form
      onSubmit={handleRHFSubmit(handleSubmit, handleSubmitError)}
      className={`
        ${styles["comment-form-component"]} 
        ${isInputFocused ? styles["--focused"] : ""}
      `}
    >
      <textarea
        placeholder="댓글을 입력해 주세요."
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
        className={styles["comment-input"]}
      />
      <div className={styles["bottom"]}>
        {formState.errors.content && (
          <small className={styles["warning-message"]}>
            {formState.errors.content?.message as string}
          </small>
        )}
        <button
          className={styles["comment-submit-button"]}
          disabled={isPending}
        >
          등록
        </button>
      </div>
    </form>
  );
};

export { CommentForm };
