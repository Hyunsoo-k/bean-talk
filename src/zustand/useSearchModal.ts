import { create } from "zustand";

type SearchModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpenValue: boolean) => void;
};

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpenValue: boolean) => set({ isOpen: isOpenValue })
}));

export default useSearchModal;