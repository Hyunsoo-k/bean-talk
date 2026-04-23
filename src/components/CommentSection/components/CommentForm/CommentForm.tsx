import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types/category";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { queryClient } from "@/constants/queryClient";
import { useCreateComment } from "./hooks/useCreateComment";
import { UnLoggedinForm } from "./components/UnLoggedinForm/UnLoggedinForm";

import styles from "./CommentForm.module.scss";

type Props = {
  category: Category;
  post_id: string;
};

const CommentForm = ({ category, post_id }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [, setIsInputFocused] = useState(false);

  const {
    register,
    formState,
    reset,
    handleSubmit: handleRHFSubmit
  } = useForm<Record<"content", string>>({ mode: "onChange" });

  const { isPending, mutate } = useCreateComment(
    category,
    post_id,
    reset,
    setIsInputFocused
  );
  
  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();

  const userMe = queryClient.getQueryData(QUERY_KEYS.userMe);

  const handleSubmit = (values: Record<"content", string>) => {
    if (!userMe) {
      openAlertModal("로그인이 필요한 기능입니다.", closeAlertModal);
      return;
    }

    const { content } = values;
    const requestBody = { content };
    mutate(requestBody);
  };

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  if (!userMe) {
    return <UnLoggedinForm />
  }

  return (
    <form
      onSubmit={handleRHFSubmit(handleSubmit)}
      className={styles["comment-form-component"]}
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
        className={styles["input"]}
      />
      <footer className={styles["footer"]}>
        {formState.errors.content && (
          <small className={styles["error-message"]}>
            {formState.errors.content?.message as string}
          </small>
        )}
        <button
          className={styles["submit-button"]}
          disabled={isPending}
        >
          등록
        </button>
      </footer>
    </form>
  );
};

export { CommentForm };
