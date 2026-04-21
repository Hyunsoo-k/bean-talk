import type { UseFormSetValue } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from '@tiptap/extension-text-align';
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

import { MapNode } from "@/components/postForm/components/PostContentForm/nodes/MapNode";

type SetValue = {
  subCategory?: any;
  thumbnailUrl: string;
  title: string;
  content: string;
};

const usePostEditor = (
  setValue: UseFormSetValue<SetValue>,
  initialContent?: string
) => {
  return useEditor(
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
        setValue("content", content);
      },
    },
    []
  );
};

export { usePostEditor };