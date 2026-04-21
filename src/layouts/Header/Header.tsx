import type { MouseEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import { useSidebarStore } from "@/zustand/useSidebarStore";
import { SearchForm } from "@/components/SearchForm/SearchForm";

import styles from "./Header.module.scss";

const Header = () => {
  const { open: openSidebar } = useSidebarStore();
  const [isSearchFormOpen, setIsSearchFormOpen] = useState<boolean>(false);

  const handleMenuClick = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    openSidebar();
  };

  const handleSearchClick = () => {
    setIsSearchFormOpen(true);
  };

  const handleCloseClick = () => {
    setIsSearchFormOpen(false);
  };

  return (
    <header className={styles["header-component"]}>
      <RxHamburgerMenu onClick={handleMenuClick} className={styles["burger-menu-icon"]}/>
      <Link to="/" className={styles["banner-link"]}>
        <h1 className={styles["banner"]}>
          BeanTalk
        </h1>
      </Link>
      {isSearchFormOpen ? (
        <button type="button" className={styles["close-button"]}>
          <IoCloseOutline onClick={handleCloseClick} className={styles["close-icon"]} />
        </button>
      ) : (
        <button type="button" className={styles["search-button"]}>
          <CiSearch onClick={handleSearchClick} className={styles["search-icon"]} />
        </button>
      )}
      {isSearchFormOpen && (
        <SearchForm setIsSearchFormOpen={setIsSearchFormOpen} context="header" />
      )}
    </header>
  );
};

export { Header };
