import { create } from "zustand";

type EdituserModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useEditUserModalStore = create<EdituserModalStore>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  }
}))

export { useEditUserModalStore };