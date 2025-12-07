import type { JSX } from "react";
import type { SubmitErrorHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";


import type { Category, PostRequestBody } from "@/types";
import { EditorContentWrapper, EditorToolbar } from "@/components/PostEditor/components/tiptap";
import { usePostEditor } from "@/hooks";
import { PostEditorHeader } from "./components/PostEditorHeader";

import styles from "./PostEditor.module.scss";

type Props <T extends Category>= {
  category: Category;
  isPending: boolean;
  submitHandler: (watch: PostRequestBody<T>) => void;
  submitError: (error: SubmitErrorHandler<PostRequestBody<T>>) => void;
};

const PostEditor = <T extends Category>({
  category,
  isPending,
  submitHandler,
  submitError
}: Props<T>): JSX.Element => {
  const { handleSubmit } = useFormContext();

  const editor = usePostEditor();

  return (
    <form
      onSubmit={handleSubmit(submitHandler, submitError)}
      className={styles["post-creator-component"]}
    >
      <PostEditorHeader category={category} isPending={isPending} />
      <div className={styles["body"]}>
        <div className={styles["toolbar-wrapper"]}>
          <EditorToolbar editor={editor} />
        </div>
        <div className={styles["content-wrapper"]}>
          <EditorContentWrapper editor={editor} />
        </div>
      </div>
    </form>
  );
};

export { PostEditor };
