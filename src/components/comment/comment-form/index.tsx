import type { JSX } from "react";
import type { FieldErrors } from "react-hook-form";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import useCreateCommentMutation from "@/hooks/api/posts/use-create-comment-mutation";
import useAlertModalStore from "@/zustand/use-alert-modal-store";
import queryKeys from "@/query-keys";

import styles from "./index.module.scss";

type Props = {
  post_id: string;
};

const CommentForm = ({ post_id }: Props): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    register,
    formState,
    handleSubmit: handleRHFSubmit
  } = useForm<Record<"content", string>>({ mode: "onChange" });

  const { isPending, mutate: createCommentMutate } = useCreateCommentMutation("thread", post_id)

  const queryClient = useQueryClient();
  const userMe = queryClient.getQueryData(queryKeys.userMe());

  const {
    setIsOpen,
    setTitle,
    setMessage,
    setHandleClick,
    resetStore
  } = useAlertModalStore();

  const handleSubmit = (formValue: Record<"content", string>) => {
    if (!userMe) {
      setIsOpen(true);
      setTitle("댓글 작성을 실패했습니다.");
      setMessage("로그인이 필요한 기능입니다.");
      setHandleClick(() => resetStore());
    }

    const requestBody = formValue;

    if (!isPending) {
      createCommentMutate(requestBody);
    }
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
        <button className={styles["comment-submit-button"]}>
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
