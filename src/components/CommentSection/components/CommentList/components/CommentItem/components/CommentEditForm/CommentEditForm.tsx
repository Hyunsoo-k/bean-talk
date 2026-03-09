import type { Dispatch, MouseEvent, SetStateAction } from "react";
import type { FieldErrors } from "react-hook-form";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types";
import { useAlertModalStore } from "@/zustand";
import { useEditComment } from "./hooks";

import styles from "./CommentEditForm.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  setMode: Dispatch<SetStateAction<"commentItem" | "commentEditForm">>;
  author: {
    _id: string;
    nickname: string;
  };
  content: string;
};

const CommentEditForm = ({
  category,
  post_id,
  comment_id,
  setMode,
  author,
  content
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { open: openAlertModal, close: closeAlertModal } = useAlertModalStore();

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  const { isPending, mutate: edit } = useEditComment(
    category,
    post_id,
    comment_id,
    setMode
  );
  
  const { register, handleSubmit: handleRHFSubmit } = useForm<Record<"content", string>>({
    defaultValues: {
      "content": content
    }
  });

  const { ref: rhfRef, ...rest } = register(
    "content",
    { validate: (value: string) => {
      return value.length < 2 ? "2자 이상 입력해주세요" : true;
    }}
  );

  const handleSubmit = (data: Record<"content", string>) => {
    const requestBody = data;

    edit(requestBody);
  };

  const handleError = (errors: FieldErrors<Record<"content", string>>) => {
    if (errors.content?.message) {
      openAlertModal(errors.content.message, closeAlertModal);
    }
  };

  const handleClickCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMode("commentItem");
  };
  
  return (
    <form
      onSubmit={handleRHFSubmit(handleSubmit, handleError)}
      className={styles["comment-edit-form-component"]}
    >
      <div className={styles["header"]}>
        <span className={styles["nickname"]}>
          {author.nickname}
        </span>
      </div>
      <textarea 
        placeholder="댓글을 입력해 주세요." 
        spellCheck={false}
        {...rest}
        ref={(element) => {
          rhfRef(element);
          textAreaRef.current = element;
        }}
        onInput={handleResizeTextArea}
      />
      <button
        type="button"
        onClick={handleClickCancel}
        className={styles["cancel-button"]}
      >
        취소
      </button>
      <button disabled={isPending} className={styles["submit-button"]}>
        등록
      </button>
    </form>
  );
};

export { CommentEditForm };