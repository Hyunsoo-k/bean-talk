import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";
import { useEditUserModalStore } from "@/zustand/useEditUserModalStore";
import { useSearchModalStore } from "@/zustand/useSearchModalStore";
import { useSearchLocalModalStore } from "@/zustand/useSearchLocalModalStore";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { AuthModal } from "@/components/modals/AuthModal/AuthModal";
import { EditUserModal } from "@/components/modals/EditUserModal/EditUserModal";
import { AlertModal } from "@/components/modals/AlertModal/AlertModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal/ConfirmModal";
import { SearchModal } from "@/components/modals/SearchModal/SearchModal";
import { SearchLocalModal } from "@/components/modals/SearchLocalModal/SearchLocalModal";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Sidebar } from "../Sidebar/SideBar";

import styles from "./MainLayout.module.scss";

type Props = {
  children: ReactNode
};

const MainLayout = ({ children }: Props) => {
  const { isOpen: isAuthModalOpen, close: closeAuthModal, open: openAuthModal } = useAuthModalStore();
  const { isOpen: isAlertModalOpen, close: closeAlertModal } = useAlertModalStore();
  const { isOpen: isConfirmModalOpen, close: closeConfirmModal } = useConfirmModalStore();
  const { isOpen: isEditUserModalOpen, close: closeEditUserModal } = useEditUserModalStore();
  const { isOpen: isSearchModalOpen, close: closeSearchModal } = useSearchModalStore();
  const { isOpen: isSearchLocalModalOpen, close: closeSearchLocalModal } = useSearchLocalModalStore();

  const { pathname, key } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    closeAuthModal();
    closeAlertModal();
    closeConfirmModal();
    closeEditUserModal();
    closeSearchModal();
    closeSearchLocalModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, key]);

  useEffect(() => {
    if (searchParams.get("auth") === "login") {
      openAuthModal();
    }
  }, [searchParams, openAuthModal, setSearchParams]);

  useScrollToTop();

  return (
    <div className={styles["main-layout-component"]}>
      <Header />
      <Sidebar />
      <main className={styles["main"]}>
        {children}
      </main>
      <Footer />
      {isAuthModalOpen && <AuthModal />}
      {isAlertModalOpen && <AlertModal />}
      {isConfirmModalOpen && <ConfirmModal />}
      {isEditUserModalOpen && <EditUserModal />}
      {isSearchModalOpen && <SearchModal />}
      {isSearchLocalModalOpen && <SearchLocalModal />}
    </div>
  );
};

export { MainLayout };