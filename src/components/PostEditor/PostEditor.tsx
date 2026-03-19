import { useFormContext } from "react-hook-form";

import { usePostEditor } from "@/hooks/usePostEditor";
import { EditorToolbar } from "./components/EditorToolbar/EditorToolbar";
import { EditorContentWrapper } from "./components/EditorContentWrapper/EditorContentWrapper";

import styles from "./PostEditor.module.scss";

type Props = {
  initialContent?: string;
};

const PostEditor = ({ initialContent }: Props) => {
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
