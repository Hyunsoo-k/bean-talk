import { create } from "zustand";

type AlertModalStore = {
  isOpen: boolean;
  message: string | null;
  handleClick: () => void;
  open: (message: string, handleClick: () => void) => void;
  close: () => void;
};

const useAlertModal = create<AlertModalStore>((set) => ({
  isOpen: false,
  message: null,
  handleClick: () => {},
  open: (message, handleClick) => { set({
    isOpen: true,
    message,
    handleClick
  })},
  close: () => { set({
    isOpen: false,
    message: null,
    handleClick: () => {},
  })}
}));

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

const useConfirmModal = create<ConfirmModalStore>((set) => ({
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

export { useAlertModal, useConfirmModal };
