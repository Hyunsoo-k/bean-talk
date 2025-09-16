import { useRef, type JSX } from "react";
import { EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";

import styles from "./index.module.scss";

type Props = {
  editor: Editor;
};

const TiptapEditorContent = ({ editor }: Props): JSX.Element => {
  const contentEditorRef = useRef<HTMLDivElement | null>(null);

  const handleClickEditorArea = (e: React.MouseEvent<HTMLDivElement>) => {
    const $contentEditor = contentEditorRef.current;
    const $proseMirror = $contentEditor?.querySelector(".ProseMirror");
    if (!editor || !$proseMirror) return;

    const $lastChild = $proseMirror.children[$proseMirror.children.length - 1];
    if (!$lastChild) return;
    const clickY = e.clientY;
    const lastY = $lastChild.getBoundingClientRect().bottom;

    const isBelow = clickY > lastY;
    const isLastChildEmptyP = $lastChild.nodeName === "P" && $lastChild.textContent?.trim() === "";

    if (isBelow && !isLastChildEmptyP) {
      const end = editor.state.doc.content.size;
      editor.commands.insertContentAt(end, { type: "paragraph" });
      editor.commands.focus("end");
    }
  };

  return (
    <EditorContent
      editor={editor}
      spellCheck="false"
      ref={contentEditorRef}
      onClick={handleClickEditorArea}
      className={styles["editor-content"]}
    />
  );
};

export default TiptapEditorContent