import { type JSX } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useSearchModal from "./zustand/useSearchModal";
import Header from "@/components/header";
import Sidebar from "./components/sidebar";
import SearchModal from "./components/modal/search-modal";
import MainPageLayout from "@/components/page-layouts/main";

import "./App.module.scss";

const App = (): JSX.Element => {
  const { isOpen: isSearchModalOpen } = useSearchModal();

  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      {isSearchModalOpen && <SearchModal />}
      <Routes>
        <Route path="/" element={<MainPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;