import type { Dispatch, JSX, MouseEvent, SetStateAction } from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import type { Category } from "@/types/category";
import useAlertModalStore from "@/zustand/use-alert-modal-store";
import useCreateReplyMutation from "@/hooks/api/posts/use-create-reply-mutation";
import queryKeys from "@/query-keys";


import styles from "./index.module.scss";
type Props = {
  setIsReplyFormOpen: Dispatch<SetStateAction<boolean>>;
  category: Category,
  post_id: string,
  comment_id: string
};

const ReplyForm = ({
  setIsReplyFormOpen,
  category,
  post_id,
  comment_id
}: Props): JSX.Element => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const queryclient = useQueryClient();
  const userMe = queryclient.getQueryData(queryKeys.userMe());
  
  const {
    register,
    formState,
    handleSubmit: handleRHFSubmit
  } = useForm<Record<"content", string>>({ mode: "onChange" });

  const { isPending, mutate: createReplyMutate } = useCreateReplyMutation(
    category,
    post_id,
    comment_id
  );

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
      createReplyMutate(requestBody);
    }
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
        <button className={styles["submit-button"]}>
          등록
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;