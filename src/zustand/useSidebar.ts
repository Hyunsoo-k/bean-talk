import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const useSidebar = create<SidebarStore>((set) => ({
  isOpen: "",
  setIsOpen: (isOpenValue: boolean) => set({ isOpen: isOpenValue })
}));

export default useSidebar;
