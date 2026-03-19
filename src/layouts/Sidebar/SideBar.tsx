import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/constants/queryClient";
import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { useSidebarStore } from "@/zustand/useSidebarStore";
import { useGetNotifications } from "@/pages/NotificationPage/hooks/useGetNotifications";
import { useGetUserMe } from "@/hooks/useGetUserMe";
import { useLogout } from "@/hooks/useLogout";
import { BackDrop } from "@/components/BackDrop/BackDrop";
import { SidebarHeader } from "./components/SidebarHeader/SidebarHeader";
import { SidebarMenuList } from "./components/SidebarMenuList/SidebarMenuList";
import { SidebarFooter } from "./components/SidebarFooter/SidebarFooter";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const location = useLocation();

  const {
    isOpen: isSidebarOpen,
    close: closeSidebar
  } = useSidebarStore();
  const { open: openAuthModal } = useAuthModalStore();

  const { data: userMe } = useGetUserMe();
  const { data: notifications } = useGetNotifications();

  const logout = useLogout();

  const threadInfinitie = queryClient.getQueryData(QUERY_KEYS.posts("thread"));
  const promotionInfinitie = queryClient.getQueryData(QUERY_KEYS.posts("promotion"));
  const jobInfinitie = queryClient.getQueryData(QUERY_KEYS.posts("job"));
  const newsInfinitie = queryClient.getQueryData(QUERY_KEYS.posts("news"));
  const noticeInfinitie = queryClient.getQueryData(QUERY_KEYS.posts("notice"));

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);

  const handleClickLoginButton = () => {
    openAuthModal();
    closeSidebar();
  };

  const handleClickLogoutButton = () => {
    logout();
  };

  return (
    <>
      {isSidebarOpen && (
        <BackDrop
          handleClickBackdrop={closeSidebar}
          isBackdropOpen={isSidebarOpen}
        />
      )}
      <div className={`
        ${styles["sidebar-component"]} 
        ${isSidebarOpen ? styles["open"] : styles["close"]}`}>
        <SidebarHeader
          userMe={userMe}
          notifications={notifications}
          handleClickLoginButton={handleClickLoginButton}
        />
        <SidebarMenuList
          threadInfinitie={threadInfinitie}
          promotionInfinitie={promotionInfinitie}
          jobInfinitie={jobInfinitie}
          newsInfinitie={newsInfinitie}
          noticeInfinitie={noticeInfinitie}
        />
        {userMe && <SidebarFooter handleClickLogoutButton={handleClickLogoutButton} />}
      </div>
    </>
  );
};

export { Sidebar };
