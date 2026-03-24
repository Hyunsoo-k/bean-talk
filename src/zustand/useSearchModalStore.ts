import { create } from "zustand";

import type { Category } from "@/types/category";

type SearchModalStore = {
  context: "header" | "postListPage" | null;
  category: Category | null;
  isOpen: boolean;
  open: (arg: {
    context: "header" | "postListPage",
    category?: Category
  }) => void;
  close: () => void;
};

const useSearchModalStore = create<SearchModalStore>((set) => ({
  context: null,
  isOpen: false,
  category: null,
  open: (arg) => {
     set({ ...arg, isOpen: true })
  },
  close: () => {
    set({
      context: null,
      isOpen: false,
    })
  }
}));

export { useSearchModalStore };