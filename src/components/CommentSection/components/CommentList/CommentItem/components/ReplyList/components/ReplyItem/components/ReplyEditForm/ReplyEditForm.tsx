import type {
  Dispatch,
  JSX,
  MouseEvent,
  SetStateAction
} from "react";
import type { FieldErrors } from "react-hook-form";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types";
import { useAlertModal } from "@/zustand";
import { useEditReply } from "./hooks";

import styles from "./ReplyEditForm.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  reply_id: string;
  setMode: Dispatch<SetStateAction<"replyItem" | "replyEditForm">>;
  author: {
    _id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  content: string;
};

const ReplyEditForm = ({
  category,
  post_id,
  comment_id,
  reply_id,
  setMode,
  author,
  content
}: Props): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { open: openAlertModal, close: closeAlertModal } = useAlertModal();

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  const { nickname } = author;

  const { isPending, mutate: edit } = useEditReply(
    category,
    post_id,
    comment_id,
    reply_id,
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
    setMode("replyItem");
  };

  return (
    <form
      onSubmit={handleRHFSubmit(handleSubmit, handleError)}
      className={styles["reply-edit-form-component"]}
    >
      <div className={styles["header"]}>
        <span className={styles["nickname"]}>
          {nickname}
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

export { ReplyEditForm };