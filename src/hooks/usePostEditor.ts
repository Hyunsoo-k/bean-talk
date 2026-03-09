import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

const usePostEditor = (setValue, initialContent?: string) => {
  return useEditor(
    {
      extensions: [
        StarterKit,
        Image,
        Placeholder.configure({
          placeholder: "내용을 입력하세요.",
        }),
      ],
      content: initialContent || "",
      onUpdate: ({ editor }) => {
        const content = editor.getHTML();
        setValue("content", content);
      },
    },
    [initialContent]
  );
};

export { usePostEditor };