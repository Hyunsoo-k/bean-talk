import type { Editor } from "@tiptap/core";
import { create } from "zustand";

type SearchLocalModalStore = {
  isOpen: boolean,
  editor: Editor | null,
  open: (editor: Editor) => void,
  close: () => void
};

const useSearchLocalModalStore = create<SearchLocalModalStore>((set) => ({
  isOpen: false,
  editor: null,
  open: (editor: Editor) => { set({ isOpen: true, editor })},
  close: () => { set({ isOpen: false, editor: null })}
}));

export { useSearchLocalModalStore };