import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

const usePostEditor = (defaultContent: string | null = null) => {
  return useEditor(
    {
      extensions: [
        StarterKit,
        Image,
        Placeholder.configure({
          placeholder: "내용을 입력하세요",
        }),
      ],
      content: defaultContent || "",
    },
    []
  );
};

export { usePostEditor };