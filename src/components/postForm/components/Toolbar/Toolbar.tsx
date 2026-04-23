import { useRef } from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { PiImageThin, PiTextItalicThin, PiTextUnderlineThin } from "react-icons/pi";
import { CiLocationOn, CiTextAlignLeft, CiTextAlignJustify, CiTextAlignRight } from "react-icons/ci";
import { LuBold } from "react-icons/lu";
import { TfiQuoteLeft, TfiLayoutLineSolid } from "react-icons/tfi";

import { useSearchLocalModalStore } from "@/zustand/useSearchLocalModalStore";

import styles from "./Toolbar.module.scss";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { open: openSearchLocalModal } = useSearchLocalModalStore();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBoldActive: ctx.editor?.isActive("bold") ?? false,
      isItalicActive: ctx.editor?.isActive("italic") ?? false,
      isUnderlineActive: ctx.editor?.isActive("underline") ?? false,
      isLeftActive: ctx.editor?.isActive({ textAlign: "left" }) ?? false,
      isCenterActive: ctx.editor?.isActive({ textAlign: "center" }) ?? false,
      isRightActive: ctx.editor?.isActive({ textAlign: "right" }) ?? false,
      isBlockquoteActive: ctx.editor?.isActive("blockquote") ?? false,
    }),
  });

  const isBoldActive = editorState?.isBoldActive ?? false;
  const isItalicActive = editorState?.isItalicActive ?? false;
  const isUnderlineActive = editorState?.isUnderlineActive ?? false;
  const isLeftActive = editorState?.isLeftActive ?? false;
  const isCenterActive = editorState?.isCenterActive ?? false;
  const isRightActive = editorState?.isRightActive ?? false;
  const isBlockquoteActive = editorState?.isBlockquoteActive ?? false;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      editor?.chain().focus().setImage({ src: localUrl }).run();
    }
  };

  if (!editor) return null;

  const iconClass = (isActive: boolean) =>
    `${styles["icon"]} ${isActive ? styles["active"] : ""}`;

  return (
    <div className={styles["toolbar-component"]}>
      <button type="button" onClick={() => fileInputRef.current?.click()} className={styles["toolbar-button"]}>
        <PiImageThin className={styles["icon"]} />
      </button>
      <button type="button" onClick={() => openSearchLocalModal(editor)} className={styles["toolbar-button"]}>
        <CiLocationOn className={styles["icon"]} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={styles["toolbar-button"]}>
        <LuBold className={iconClass(isBoldActive)} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={styles["toolbar-button"]}>
        <PiTextUnderlineThin className={iconClass(isUnderlineActive)} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={styles["toolbar-button"]}>
        <PiTextItalicThin className={iconClass(isItalicActive)} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={styles["toolbar-button"]}>
        <CiTextAlignLeft className={iconClass(isLeftActive)} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={styles["toolbar-button"]}>
        <CiTextAlignJustify className={iconClass(isCenterActive)} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={styles["toolbar-button"]}>
        <CiTextAlignRight className={iconClass(isRightActive)} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={styles["toolbar-button"]}>
        <TfiQuoteLeft className={iconClass(isBlockquoteActive)} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={styles["toolbar-button"]}>
        <TfiLayoutLineSolid className={styles["icon"]} />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export { Toolbar };