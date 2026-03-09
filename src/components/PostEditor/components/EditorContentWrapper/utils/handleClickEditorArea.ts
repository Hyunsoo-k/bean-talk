import type { Editor } from "@tiptap/core";
import type { MouseEvent } from "react";

const handleClickEditorArea = (
  e: MouseEvent<HTMLDivElement>,
  editor: Editor
) => {
    const $proseMirror = editor.view.dom;

    if (!editor || !$proseMirror) return;

    const $lastChild = $proseMirror.children[$proseMirror.children.length - 1];
    if (!$lastChild) return;

    const clickY = e.clientY;
    const lastElementY = $lastChild.getBoundingClientRect().bottom;

    const isBelow = clickY > lastElementY;
    const isLastChildEmptyP =
      $lastChild.nodeName === "P" && $lastChild.textContent?.trim() === "";

    if (isBelow && !isLastChildEmptyP) {
      const end = editor.state.doc.content.size;
      editor.commands.insertContentAt(end, { type: "paragraph" });
      editor.commands.focus("end");
    }
  };

  export { handleClickEditorArea };