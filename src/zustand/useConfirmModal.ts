import { create } from "zustand";

type ConfirmModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpenValue: boolean) => void;
  message: null | string;
  setMessage: (message: null | string) => void;
  handleClickCheck: () => void;
  handleClickCancel: () => void;
  setHandleClickCheck: (handleClickCheck: () => void) => void;
  setHandleClickCancel: (handleClickCancel: () => void) => void;
  resetStore: () => void;
};

const useConfirmModal = create<ConfirmModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpenValue) => set({ isOpen: isOpenValue }),
  message: null,
  setMessage: (message) => set({ message }),
  handleClickCheck: () => {},
  handleClickCancel: () => {},
  setHandleClickCheck: (handleClickCheck) => set({ handleClickCheck }),
  setHandleClickCancel: (setHandleClickCancel) => set({ setHandleClickCancel }),
  resetStore: () => set({
    isOpen: false,
    message: null,
    handleClickCheck: () => {},
    handleClickCancel: () => {},
  }),
}));

export { useConfirmModal };