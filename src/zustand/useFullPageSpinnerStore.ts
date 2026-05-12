import { create } from "zustand";

type OpenFullPageSpinnerStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useFullPageSpinnerStore = create<OpenFullPageSpinnerStore>((set) => ({
  isOpen: false,
  open: () => { set({ isOpen: true }); },
  close: () => { set({ isOpen: false }); }
}));

export { useFullPageSpinnerStore };