import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import {
  useAlertModalStore,
  useAuthModalStore,
  useConfirmModalStore,
  useEditUserModalStore
} from "@/zustand";
import { AuthModal, EditUserModal } from "@/components/modals";
import { AlertModal, ConfirmModal } from "@/components/modals"
import { Header, Footer, Sidebar } from "@/layouts";

import styles from "./MainLayout.module.scss";

type Props = {
  children: ReactNode
};

const MainLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";

  const { isOpen: isAuthModalOpen } = useAuthModalStore();
  const { isOpen: isAlertModalOpen } = useAlertModalStore();
  const { isOpen: isConfirmModalOpen } = useConfirmModalStore();
  const { isOpen: isEditUserModalOpen } = useEditUserModalStore();

  return (
    <div className={styles["main-layout-component"]}>
      <Header />
      <Sidebar />
      <div
        className={`${styles["main"]} ${isMainPage ? styles["--main-page"] : "" }`}
      >
        {children}
      </div>
      <Footer />
      {isAuthModalOpen && <AuthModal />}
      {isAlertModalOpen && <AlertModal />}
      {isConfirmModalOpen && <ConfirmModal />}
      {isEditUserModalOpen && <EditUserModal />}
    </div>
  );
};

export { MainLayout };