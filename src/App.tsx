import type { JSX } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {CookiesProvider} from 'react-cookie';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import useSearchModalStore from "@/zustand/use-search-modal-store";
import useAuthModalStore from "@/zustand/use-auth-modal-store";
import useAlertModalStore from "./zustand/use-alert-modal-store";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import SidebarWatcher from "@/components/sidebar-watcher";
import ModalWatcher from "@/components/modal/modal-watcher";
import AlertModal from "./components/modal/alert-modal";
import SearchModal from "@/components/modal/search-modal";
import AuthModal from "@/components/modal/auth-modal";
import MainPageLayout from "@/components/page-layouts/main";
import InformationPageLayout from "@/components/page-layouts/me/information";
import NotificationPageLayout from "@/components/page-layouts/me/notification";
import ThreadsListPageLayout from "@/components/page-layouts/threads/posts";
import ThreadsPostPageLayout from "@/components/page-layouts/threads/post";
import PromotionListPageLayout from "@/components/page-layouts/promotion/list";
import PromotionPostPageLayout from "@/components/page-layouts/promotion/post";
import JobPageLayout from "@/components/page-layouts/job/posts";
import NewsListPageLayout from "@/components/page-layouts/news/posts";
import NewsPostPageLayout from "@/components/page-layouts/news/post";
import NewsPostCreatePageLayout from "@/components/page-layouts/news/post/create";
import NoticeListPageLayout from "@/components/page-layouts/notice/posts";
import NoticePostPageLayout from "@/components/page-layouts/notice/post";
import SuggestionListPageLayout from "@/components/page-layouts/suggestion/posts";
import SuggestionPostPageLayout from "./components/page-layouts/suggestion/post";
import Footer from "@/components/footer";

import "./App.module.scss";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const { isOpen: isSearchModalOpen } = useSearchModalStore();
  const { isOpen: isLAuthModalOpen } = useAuthModalStore();
  const { isOpen: isAlertModalOpen } = useAlertModalStore();

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <SidebarWatcher />
          <ModalWatcher />
          {isSearchModalOpen && <SearchModal />}
          {isLAuthModalOpen && <AuthModal />}
          {isAlertModalOpen && <AlertModal />}
          <Routes>
            <Route path="/" element={<MainPageLayout />} />
            <Route path="/me/information" element={<InformationPageLayout />} />
            <Route path="/me/notification" element={<NotificationPageLayout />} />
            <Route path="/bbs/categories/thread/posts" element={<ThreadsListPageLayout />} />
            <Route path="/bbs/categories/thread/posts/:post_id" element={<ThreadsPostPageLayout />} />
            <Route path="/bbs/categories/promotion/posts" element={<PromotionListPageLayout />} />
            <Route path="/bbs/categories/promotion/posts/:post_id" element={<PromotionPostPageLayout />} />
            <Route path="/bbs/categories/job/posts" element={<JobPageLayout />} />
            <Route path="/bbs/categories/job/posts/:post_id" element={<NewsListPageLayout />} />
            <Route path="/bbs/categories/news/posts" element={<NewsPostCreatePageLayout />} />
            <Route path="/bbs/categories/news/posts/:post_id" element={<NewsPostPageLayout />} />
            <Route path="/bbs/categories/notice/posts" element={<NoticeListPageLayout />} />
            <Route path="/bbs/categories/notice/posts/:post_id" element={<NoticePostPageLayout />} />
            <Route path="/bbs/categories/suggestion/posts" element={<SuggestionListPageLayout />} />
            <Route path="/bbs/categories/suggestion/posts/:post_id" element={<SuggestionPostPageLayout />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default App;
