import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/types/category";
import { useActiveComment } from "@/components/CommentSection/zustand/useActiveComment";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";
import { useEditComment } from "./hooks/useEditComment";

import styles from "./CommentEditForm.module.scss";

type Props = {
  category: Category;
  post_id: string;
  comment_id: string;
  setMode: Dispatch<SetStateAction<"view" | "edit">>;
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
  content
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const { setActiveComment } = useActiveComment();
  const { open: openFullPageSpinner } = useFullPageSpinnerStore();
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

  const handleResizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

  const { ref: rhfRef, ...rest } = register(
    "content",
    { validate: (value: string) => {
      return value.length < 2 ? "2자 이상 입력해주세요" : true;
    }}
  );

  const handleSubmit = (data: Record<"content", string>) => {
    openFullPageSpinner();
    const requestBody = data;
    edit(requestBody);
  };

  const handleCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActiveComment(null);
    setMode("view");
  };
  
  return (
    <form
      onSubmit={handleRHFSubmit(handleSubmit)}
      className={styles["comment-edit-form-component"]}
    >
      <textarea 
        placeholder="내용을 입력해 주세요." 
        spellCheck={false}
        {...rest}
        ref={(element) => {
          rhfRef(element);
          textAreaRef.current = element;
        }}
        onInput={handleResizeTextArea}
        className={styles["input"]}
      />
      <footer className={styles["footer"]}>
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
          수정
        </button>
      </footer>
    </form>
  );
};

export { CommentEditForm };