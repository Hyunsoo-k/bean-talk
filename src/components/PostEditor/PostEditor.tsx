import type { JSX } from "react";
import { useFormContext } from "react-hook-form";

import { usePostEditor } from "@/hooks";
import { EditorToolbar } from "./components/EditorToolbar";
import { EditorContentWrapper } from "./components/EditorContentWrapper/EditorContentWrapper";

import styles from "./PostEditor.module.scss";
type Props = {
  initialContent?: string;
};

const PostEditor = ({ initialContent }: Props): JSX.Element => {
  const { setValue } = useFormContext();

  const editor = usePostEditor(setValue, initialContent);

  return (
    <div className={styles["post-editor-component"]}>
      <EditorToolbar editor={editor} />
      <EditorContentWrapper editor={editor} />
    </div>
  );
};

export { PostEditor };
