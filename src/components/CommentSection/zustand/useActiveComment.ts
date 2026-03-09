import { create } from "zustand";

type ActiveCommentStore = {
  activeComment: string | null;
  setActiveComment: (value: string | null) => void;
};

const useActiveComment = create<ActiveCommentStore>((set) => ({
  activeComment: null,
  setActiveComment: (value) => { set({ activeComment: value })}
}));

export { useActiveComment };