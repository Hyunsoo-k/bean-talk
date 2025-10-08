import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearchModalStore from "@/zustand/use-search-modal-store";
import useAuthModalStore from "@/zustand/use-auth-modal-store";

const ModalWatcher = (): null => {
  const { setIsOpen: setIsSearchModalOpen } = useSearchModalStore();
  const { setIsOpen: setIsAuthModalOpen } = useAuthModalStore();
  const location = useLocation();

  useEffect(() => {
    setIsSearchModalOpen(false);
    setIsAuthModalOpen(false);
  }, [location]);

  return null;
};

export default ModalWatcher;
