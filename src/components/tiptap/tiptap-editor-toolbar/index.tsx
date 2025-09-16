import { useRef, type JSX } from "react";
import { Editor, useEditorState } from "@tiptap/react"
import { LuBold } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";

import styles from "./index.module.scss";

type Props = {
  editor: Editor | null;
};

const TiptapEditorToolbar = ({ editor }: Props): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isBoldActive } = useEditorState({
  editor,
  selector: () => ({ isBoldActive: editor?.isActive("bold") ?? false }),
  }) as { isBoldActive: boolean };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      editor.chain().focus().setImage({ src: base64 }).run();
    };
  };

  if (!editor) return <></>;

  return (
    <div className={styles["tiptap-editor-toolbar-component"]}>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <LuBold
          size={23}
          color={isBoldActive ? "rgb(9, 204, 178)" : "rgb(44, 44, 44)"}
        />
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        <CiImageOn size={23} color="rgb(44, 44, 44)" />
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

export default TiptapEditorToolbar;
