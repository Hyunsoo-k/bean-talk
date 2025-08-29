import { create } from "zustand";

type SearchModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: true,
  setIsOpen: (isOpenValue: boolean) => set({ isOpen: isOpenValue })
}));

export default useSearchModal;