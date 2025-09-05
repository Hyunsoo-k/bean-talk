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
import ThreadsListPageLayout from "@/components/page-layouts/threads/list";
import PromotionListPageLayout from "@/components/page-layouts/promotion/list";
import NewsListPageLayout from "@/components/page-layouts/news/list";
import NoticeListPageLayout from "@/components/page-layouts/notice/list";
import SuggestionListPageLayout from "@/components/page-layouts/suggestion/list";
import Footer from "@/components/footer";

import "./App.module.scss";

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
        <Route path="/threads/list" element={<ThreadsListPageLayout />} />
        <Route path="/promotion/list" element={<PromotionListPageLayout />} />
        <Route path="/news/list" element={<NewsListPageLayout />} />
        <Route path="/notice/list" element={<NoticeListPageLayout />} />
        <Route path="/suggestion/list" element={<SuggestionListPageLayout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
