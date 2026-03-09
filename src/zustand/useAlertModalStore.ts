import { create } from "zustand";

type AlertModalStore = {
  isOpen: boolean;
  message: string | null;
  handleClick: () => void;
  open: (message: string, handleClick: () => void) => void;
  close: () => void;
};

const useAlertModalStore = create<AlertModalStore>((set) => ({
  isOpen: false,
  message: null,
  handleClick: () => {},
  open: (message, handleClick) => {
    set({
      isOpen: true,
      message,
      handleClick
    });
  },
  close: () => {
    set({
      isOpen: false,
      message: null,
      handleClick: () => {},
    })
  }
}));

export { useAlertModalStore };
