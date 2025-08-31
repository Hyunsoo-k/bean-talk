import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSidebar from "@/zustand/useSidebar";

const SidebarWatcher = (): null => {
  const { setIsOpen } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return null;
};

export default SidebarWatcher;
