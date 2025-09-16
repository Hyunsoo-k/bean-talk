import { useState, type JSX } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import TiptapEditorToolbar from "@/components/tiptap/tiptap-editor-toolbar";
import TiptapEditorContent from "@/components/tiptap/tiptap-editor-content";

import styles from "./index.module.scss";

const PostCreator = (): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "내용을 입력하세요",
      }),
    ],
    content: "",
  });

  return (
    <div className={styles["post-creator-component"]}>
      <div className={styles["top"]}>
        <input
          placeholder="제목을 입력해 주세요."
          autoComplete="off"
          className={styles["title"]}
        />
        <div className={styles["information-and-button-box"]}>
          <div className={styles["profile-box"]}>
            <div
              className={styles["profile-image"]}
              style={{ backgroundImage: `url(${defaultProfile})` }}
            />
            <span className={styles["nickname"]}>운영자</span>
          </div>
          <div className={styles["button-box"]}>
            <button type="button" className={styles["cancel-button"]}>취소</button>
            <button className={styles["submit-button"]}>등록</button>
          </div>
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["toolbar-wrapper"]}>
          <TiptapEditorToolbar editor={editor} />
        </div>
        <div className={styles["content-wrapper"]}>
          <TiptapEditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
