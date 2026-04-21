import { create } from "zustand";

type ConfirmModalStore = {
  isOpen: boolean,
  message: string | null;
  subMessage: string | null;
  handleClickCancel: () => void;
  handleClickConfirm: () => void;
  open: (
    message: string,
    subMessage: string,
    handleClickCancel: () => void,
    handleClickConfirm: () => void
  ) => void;
  close: () => void;
};

const useConfirmModalStore = create<ConfirmModalStore>((set) => ({
  isOpen: false,
  message: null,
  subMessage: null,
  handleClickCancel: () => {},
  handleClickConfirm: () => {},
  open: (
    message,
    subMessage,
    handleClickCancel,
    handleClickConfirm
  ) => { set({
    isOpen: true,
    message,
    subMessage,
    handleClickCancel,
    handleClickConfirm
  })},
  close: () => { set({
    isOpen: false,
    message: null,
    subMessage: null,
    handleClickCancel: () => {},
    handleClickConfirm: () => {},
  })}
}))

export { useConfirmModalStore };