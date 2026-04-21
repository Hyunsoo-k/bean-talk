import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useSearchModalStore } from "@/zustand/useSearchModalStore";

import { useSidebarStore } from "@/zustand/useSidebarStore";

import styles from "./Header.module.scss";

const Header = () => {
  const { open: openSidebar } = useSidebarStore();
  const {
    isOpen: isSearchModalOpen,
    open: openSearchModal,
    close: closeSearchModal
  } = useSearchModalStore();

  const handleMenuClick = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    openSidebar();
  };

  const handleSearchClick = () => {
    openSearchModal({ context: "header" });
  };

  const handleCloseClick = () => {
    closeSearchModal();
  };

  return (
    <div className={styles["header-component"]}>
      <div className={styles["left-area"]}>
        <RxHamburgerMenu
          size={22}
          color="#2C2C2C"
          onClick={handleMenuClick}
        />
        <Link to="/">
          <h1 className={styles["banner"]}>
            BeanTalk
          </h1>
        </Link>
      </div>
      <div className={styles["right-area"]}>
        {isSearchModalOpen ? (
          <button type="button" className={styles["close-button"]}>
            <IoCloseOutline
              size={24}
              color="#2C2C2C"
              onClick={handleCloseClick}
              className={styles["close-icon"]}
            />
          </button>
        ) : (
          <button type="button" className={styles["search-button"]}>
            <CiSearch
              size={24}
              color="#2C2C2C"
              onClick={handleSearchClick}
              className={styles["search-icon"]}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export { Header };
