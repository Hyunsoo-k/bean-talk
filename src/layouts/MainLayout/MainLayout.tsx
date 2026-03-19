import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { useConfirmModalStore } from "@/zustand/useConfirmModalStore";
import { useEditUserModalStore } from "@/zustand/useEditUserModalStore";
import { AuthModal } from "@/components/modals/AuthModal/AuthModal";
import { EditUserModal } from "@/components/modals/EditUserModal/EditUserModal";
import { AlertModal } from "@/components/modals/AlertModal/AlertModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal/ConfirmModal";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Sidebar } from "../Sidebar/SideBar";

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