import type { JSX, ReactNode } from "react";

import { Header, Footer, Sidebar } from "../components";

import { useAlertModal, useAuthModal, useConfirmModal } from "@/zustand";
import { AuthModal } from "@/components/AuthModal";
import { AlertModal, ConfirmModal } from "@/components/ui";

import styles from "./MainLayout.module.scss";

type Props = {
  children: ReactNode
};

const MainLayout = ({ children }: Props): JSX.Element => {
  const { isOpen: isAuthModalOpen } = useAuthModal();
  const { isOpen: isAlertModalOpen } = useAlertModal();
  const { isOpen: isConfirmModalOpen } = useConfirmModal();

  return (
    <div className={styles["main-layout-component"]}>
      <Header />
      <Sidebar />
      <div className={styles["main"]}>
        {children}
      </div>
      <Footer />
      {isAuthModalOpen && <AuthModal />}
      {isAlertModalOpen && <AlertModal />}
      {isConfirmModalOpen && <ConfirmModal />}
    </div>
  );
};

export { MainLayout };