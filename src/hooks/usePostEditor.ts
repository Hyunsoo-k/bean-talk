import type { UseFormSetValue, Path, PathValue } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from '@tiptap/extension-text-align';
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

import type { Category } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import { MapNode } from "@/components/postForm/components/PostContentForm/nodes/MapNode";

const usePostEditor = <T extends Category>(
  setValue: UseFormSetValue<PostRequestBody<T>>,
  initialContent?: string
) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Image,
        TextAlign.configure({ types: ["paragraph", "heading", "strong"] }),
        Underline,
        Placeholder.configure({ placeholder: "내용을 입력하세요." }),
        MapNode
      ],
      content: initialContent || "",
      onUpdate: ({ editor }) => {
        const content = editor.getHTML();
        setValue(
          "content" as Path<PostRequestBody<T>>,
          content as PathValue<PostRequestBody<T>, Path<PostRequestBody<T>>>
        );
      },
    },
    []
  );

  return editor;
};

export { usePostEditor };