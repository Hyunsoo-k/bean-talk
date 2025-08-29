import type { JSX, MouseEvent } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

import useSidebar from "@/zustand/useSidebar";

import styles from "./index.module.scss";

const Header = (): JSX.Element => {
  const { setIsOpen } = useSidebar();

  const handleClickMenu = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    setIsOpen(true);
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
        <CiSearch size={24} color="#2C2C2C" />
      </div>
    </div>
  );
};

export default Header;