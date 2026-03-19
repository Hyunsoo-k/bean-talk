import type { JSX, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import { useSidebarStore } from "@/zustand/useSidebarStore";

import styles from "./Header.module.scss";

const Header = (): JSX.Element => {
  const { open: openSidebar } = useSidebarStore();

  const handleClickMenu = (e: MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    openSidebar();
  };

  return (
    <div className={styles["header-component"]}>
      <div className={styles["left-area"]}>
        <RxHamburgerMenu
          size={22}
          color="#2C2C2C"
          onClick={handleClickMenu}
        />
        <Link to="/">
          <h1 className={styles["banner"]}>
            BeanTalk
          </h1>
        </Link>
      </div>
      <div className={styles["right-area"]}>
        <CiSearch
          size={24}
          color="#2C2C2C"
        />
      </div>
    </div>
  );
};

export { Header };
