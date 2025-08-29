import type { JSX, MouseEvent } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import useSidebar from "@/zustand/useSidebar";

import styles from "./index.module.scss";
import useSearchModal from "@/zustand/useSearchModal";

const Header = (): JSX.Element => {
  const { setIsOpen: setIsSidebarOpen } = useSidebar();
  const { isOpen: isSearchModalOpen, setIsOpen: setIsSearchModalOpen } = useSearchModal();

  const handleClickMenu = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    setIsSidebarOpen(true);
  };

  const handleClickSearch = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    setIsSearchModalOpen(true);
  };

  const handleClickClose = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    setIsSearchModalOpen(false);
  };

  return (
    <div className={styles["header-component"]}>
      <div className={styles["left-area"]}>
        <RxHamburgerMenu
          size={22}
          color="#2C2C2C"
          onClick={handleClickMenu}
        />
        <h1 className={styles["banner"]}>BeanTalk</h1>
      </div>
      <div className={styles["right-area"]}>
        {isSearchModalOpen
          ? < IoCloseOutline
                size={24}
                color="#2C2C2C"
                onClick={handleClickClose}
              />
          : <CiSearch
              size={24}
              color="#2C2C2C"
              onClick={handleClickSearch}
            />
        }
      </div>
    </div>
  );
};

export default Header;