import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSidebarStore } from "@/zustand/useSidebarStore";
import { useGetUserMe } from "@/hooks/useGetUserMe";
import { useScrollLock } from "@/hooks/useScrollLock";
import { BackDrop } from "@/components/BackDrop/BackDrop";
import { SidebarHeader } from "./components/SidebarHeader/SidebarHeader";
import { SidebarMenuList } from "./components/SidebarMenuList/SidebarMenuList";
import { SidebarFooter } from "./components/SidebarFooter/SidebarFooter";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const location = useLocation();
  const { isOpen: isSidebarOpen, close: closeSidebar } = useSidebarStore();
  const { data: userMe } = useGetUserMe();
  useScrollLock(isSidebarOpen);

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);

  return (
    <>
      {isSidebarOpen && (
        <BackDrop
          onBackdropClick={closeSidebar}
          isBackdropOpen={isSidebarOpen}
        />
      )}
      <aside className={`
        ${styles["sidebar-component"]} 
        ${isSidebarOpen ? styles["open"] : styles["close"]}`}
      >
        <SidebarHeader userMe={userMe} />
        <SidebarMenuList />
        {userMe && <SidebarFooter />}
      </aside>
    </>
  );
};

export { Sidebar };
