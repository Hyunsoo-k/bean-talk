import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpenValue: boolean) => set({ isOpen: isOpenValue }),
}));

export default useSidebarStore;
