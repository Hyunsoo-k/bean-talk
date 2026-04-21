import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Editor, EditorContent } from "@tiptap/react";

import { handleEditorClick } from "./utils/handleEditorClick";

import styles from "./PostContentForm.module.scss";

type Props = {
  editor: Editor;
};

const PostContentForm = ({ editor }: Props) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (!editor) {
      return;
    };

    const handler = () => {
      const html = editor.getHTML();
      setValue("content", html, { shouldDirty: true, shouldTouch: true });
    };

    editor.on("update", handler);

    return () => {
      editor.off("update", handler); 
    };
  }, [editor, setValue]);

  const isEmptyContent = (html: string): boolean => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent ?? "";

    return text.trim() === "";
  };

  return (
    <Controller
      name="content"
      control={control}
      rules={{
        validate: (value) => {
          return isEmptyContent(value) ? "본문을 입력해 주세요." : true;
        }
      }}
      render={() => {
        return (
          <div
            onClick={(e) => { handleEditorClick(e, editor); }}
            className={styles["post-content-form-component"]}
          >
            <EditorContent
              editor={editor}
              spellCheck={false} 
              className={styles["editor-content"]}
            />
          </div>
        )
      }}
    />
  );
};

export { PostContentForm };