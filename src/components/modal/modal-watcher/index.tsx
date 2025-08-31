import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearchModal from "@/zustand/useSearchModal";
import useAuthModal from "@/zustand/useAuthModal";

const ModalWatcher = (): null => {
  const { setIsOpen: setIsSearchModalOpen } = useSearchModal();
  const { setIsOpen: setIsAuthModalOpen } = useAuthModal();
  const location = useLocation();

  useEffect(() => {
    setIsSearchModalOpen(false);
    setIsAuthModalOpen(false);
  }, [location]);

  return null;
};

export default ModalWatcher;
