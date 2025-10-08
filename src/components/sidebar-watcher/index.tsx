import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSidebarStore from "@/zustand/use-sidebar-store";

const SidebarWatcher = (): null => {
  const location = useLocation();
  const { setIsOpen } = useSidebarStore();

  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);

  return null;
};

export default SidebarWatcher;
