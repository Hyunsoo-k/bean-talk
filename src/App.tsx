import { type JSX } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useSidebar from "./zustand/useSidebar";
import Header from "@/components/header";
import Sidebar from "./components/sidebar";
import MainPageLayout from "@/components/page-layouts/main";

import "./App.module.scss";

const App = (): JSX.Element => {
  const { isOpen } = useSidebar();

  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;