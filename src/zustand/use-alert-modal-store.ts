import { create } from "zustand";

type AlertModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpenValue: boolean) => void;
  title: null | string;
  setTitle: (title: null | string) => void;
  message: null | string;
  setMessage: (message: null | string) => void;
  handleClick: () => void;
  setHandleClick: (handleClick: () => void) => void;
  resetStore: () => void;
};

const useAlertModalStore = create<AlertModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpenValue: boolean) => set({ isOpen: isOpenValue }),
  title: null,
  setTitle: (title: null | string) => set({ title }),
  message: null,
  setMessage: (message: null | string) => set({ message }),
  handleClick: () => {},
  setHandleClick: (handleClick: () => void) => set({ handleClick }),
  resetStore: () => set({
    isOpen: false,
    title: null,
    message: null,
    handleClick: () => {},
  }),
}));

export default useAlertModalStore;
