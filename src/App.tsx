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
import ThreadsPostPageLayout from "@/components/page-layouts/threads/post";
import PromotionListPageLayout from "@/components/page-layouts/promotion/list";
import PromotionPostPageLayout from "@/components/page-layouts/promotion/post";
import NewsListPageLayout from "@/components/page-layouts/news/list";
import NewsPostPageLayout from "@/components/page-layouts/news/post";
import NewsPostCreatePageLayout from "@/components/page-layouts/news/post/create";
import NoticeListPageLayout from "@/components/page-layouts/notice/list";
import NoticePostPageLayout from "@/components/page-layouts/notice/post";
import SuggestionListPageLayout from "@/components/page-layouts/suggestion/list";
import SuggestionPostPageLayout from "./components/page-layouts/suggestion/post";
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
        <Route path="/threads/post/:post_id" element={<ThreadsPostPageLayout />} />
        <Route path="/promotion/list" element={<PromotionListPageLayout />} />
        <Route path="/promotion/post/:post_id" element={<PromotionPostPageLayout />} />
        <Route path="/news/list" element={<NewsListPageLayout />} />
        <Route path="/news/post/create" element={<NewsPostCreatePageLayout />} />
        <Route path="/news/post/:post_id" element={<NewsPostPageLayout />} />
        <Route path="/notice/list" element={<NoticeListPageLayout />} />
        <Route path="/notice/post/:post_id" element={<NoticePostPageLayout />} />
        <Route path="/suggestion/list" element={<SuggestionListPageLayout />} />
        <Route path="/suggestion/post/:post_id" element={<SuggestionPostPageLayout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
