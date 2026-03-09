import { create } from "zustand";

type ConfirmModalStore = {
  isOpen: boolean,
  message: string | null;
  handleClickCancel: () => void;
  handleClickConfirm: () => void;
  open: (
    message: string,
    handleClickCancel: () => void,
    handleClickConfirm: () => void
  ) => void;
  close: () => void;
};

const useConfirmModalStore = create<ConfirmModalStore>((set) => ({
  isOpen: false,
  message: null,
  handleClickCancel: () => {},
  handleClickConfirm: () => {},
  open: (
    message,
    handleClickCancel,
    handleClickConfirm
  ) => { set({
    isOpen: true,
    message,
    handleClickCancel,
    handleClickConfirm
  })},
  close: () => { set({
    isOpen: false,
    message: null,
    handleClickCancel: () => {},
    handleClickConfirm: () => {},
  })}
}))

export { useConfirmModalStore };