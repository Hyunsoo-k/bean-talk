import { useRef } from "react";
import { Editor, useEditorState } from "@tiptap/react"
import { PiImageThin } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { LuBold } from "react-icons/lu";
import { PiTextItalicThin } from "react-icons/pi";
import { TfiQuoteLeft } from "react-icons/tfi";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignJustify } from "react-icons/ci";
import { CiTextAlignRight } from "react-icons/ci";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { PiTextUnderlineThin } from "react-icons/pi";

import { useSearchLocalModalStore } from "@/zustand/useSearchLocalModalStore";

import styles from "./Toolbar.module.scss";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { open: openSearchLocalModal } = useSearchLocalModalStore();

  const { 
    isBoldActive, 
    isItalicActive, 
    isLeftActive, 
    isCenterActive, 
    isRightActive,
    isBlockquoteActive,
    isUnderlineActive
  } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBoldActive: ctx.editor?.isActive("bold") ?? false,
      isItalicActive: ctx.editor?.isActive("italic") ?? false,
      isLeftActive: ctx.editor?.isActive({ textAlign: "left" }) ?? false,
      isCenterActive: ctx.editor?.isActive({ textAlign: "center" }) ?? false,
      isRightActive: ctx.editor?.isActive({ textAlign: "right" }) ?? false,
      isBlockquoteActive: ctx.editor?.isActive("blockquote") ?? false,
      isUnderlineActive: ctx.editor?.isActive("underline") ?? false
    }),
  });

  const handleImageUpload = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    const localUrl = URL.createObjectURL(file);
    editor?.chain().focus().setImage({ src: localUrl }).run();
  }
};

  if (!editor) {
    return <></>;
  }

  return (
    <div className={styles["toolbar-component"]}>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={styles["toolbar-button"]}
      >
        <PiImageThin className={styles["icon"]} />
      </button>
      <button
        type="button"
        onClick={() => { openSearchLocalModal(editor); }}
        className={styles["toolbar-button"]}
      >
        <CiLocationOn className={styles["icon"]} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={styles["toolbar-button"]}
      >
        <LuBold className={`${styles["icon"]} ${isBoldActive ? styles["active"] : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={styles["toolbar-button"]}
      >
        <PiTextUnderlineThin className={`${styles["icon"]} ${isUnderlineActive ? styles["active"] : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={styles["toolbar-button"]}
      >
        <PiTextItalicThin className={`${styles["icon"]} ${isItalicActive ? styles["active"] : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={styles["toolbar-button"]}
      >
        <CiTextAlignLeft className={`${styles["icon"]} ${isLeftActive ? styles["active"] : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={styles["toolbar-button"]}
      >
        <CiTextAlignJustify className={`${styles["icon"]} ${isCenterActive ? styles["active"] : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={styles["toolbar-button"]}
      >
        <CiTextAlignRight className={`${styles["icon"]} ${isRightActive ? styles["active"] : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={styles["toolbar-button"]}
      >
        <TfiQuoteLeft className={`${styles["icon"]} ${isBlockquoteActive ? styles["active"] : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={styles["toolbar-button"]}
      >
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
