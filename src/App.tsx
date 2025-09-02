import { type JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useSearchModal from "@/zustand/useSearchModal";
import useAuthModal from "@/zustand/useAuthModal";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarWatcher from "@/components/sidebar/sidebar-watcher";
import ModalWatcher from "@/components/modal/modal-watcher";
import SearchModal from "@/components/modal/search-modal";
import AuthModal from "@/components/modal/auth-modal";
import MainPageLayout from "@/components/page-layouts/main";
import InformationPageLayout from "@/components/page-layouts/me/information";
import NotificationPageLayout from "@/components/page-layouts/me/notification";

import styles from "./App.module.scss";

const App = (): JSX.Element => {
  const { isOpen: isSearchModalOpen } = useSearchModal();
  const { isOpen: isLAuthModalOpen } = useAuthModal();

  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <SidebarWatcher />
      <ModalWatcher />
      {isSearchModalOpen && <SearchModal />}
      {isLAuthModalOpen && <AuthModal />}
      <Routes>
        <Route path="/" element={<MainPageLayout />} />
        <Route path="/me/information" element={<InformationPageLayout />} />
        <Route path="/me/notification" element={<NotificationPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
