import { create } from "zustand";

type AuthModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpenValue: boolean) => void;
};

const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpenValue: boolean) => set({ isOpen: isOpenValue }),
}));

export default useAuthModalStore;
