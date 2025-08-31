import { useRef, useEffect, type JSX, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { BsFillThreadsFill } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { TbSpeakerphone } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import useSidebar from "@/zustand/useSidebar";
import useAuthModal from "@/zustand/useAuthModal";
import useUser from "@/zustand/useUser";

import styles from "./index.module.scss";

const Sidebar = (): JSX.Element => {
  const { isOpen: isSidebarOpen, setIsOpen: setIsSidebarOpen } = useSidebar();
  const { setIsOpen: setIsAuthModalOpen } = useAuthModal();
  const { user, setUser } = useUser();

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickBackDrop = (e: globalThis.MouseEvent) => {
      if (!sidebarRef.current) return;
      const clickTarget = e.target as HTMLElement;

      if (!sidebarRef.current.contains(clickTarget)) setIsSidebarOpen(false);
    };

    document.addEventListener("click", handleClickBackDrop);

    return () => {
      document.removeEventListener("click", handleClickBackDrop);
    };
  }, []);

  const handleClickLoginButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsAuthModalOpen(true);
    setIsSidebarOpen(false);
  };

  const NewIcon = (): JSX.Element => <div className={styles["new-icon"]}>N</div>;

  return (
    <>
      {isSidebarOpen && <div className={styles["backdrop"]}></div>}
      <div
        ref={sidebarRef}
        className={`${styles["sidebar-component"]} ${isSidebarOpen ? styles["--open"] : styles["--close"]}`}
      >
        <div className={styles["top-area"]}>
          {user ? (
            <div className={styles["logged-in"]}>
              <Link to="/me/information" className={styles["profile-image-wrapper"]}>
                <div
                  className={styles["profile-image"]}
                  style={{
                    backgroundImage: user.profileImage ? `url(${user.profileImage})` : `url(${defaultProfile})`,
                  }}
                />
              </Link>
              <Link to="/me/notification">
                <GoBell size={25} color="#2C2C2C" />
              </Link>
              <div className={styles["red-dot"]} />
              <span className={styles["nickanme"]}>운영자</span>
              <span className={styles["email"]}>baentalk@naver.com</span>
            </div>
          ) : (
            <div className={styles["unlogged-in"]}>
              <span className={styles["phrase"]}>
                평범한 순간을
                <br />
                커피와 특별하게
              </span>
              <button type="button" onClick={handleClickLoginButton} className={styles["login-button"]}>
                빈톡 시작하기
              </button>
            </div>
          )}
        </div>
        <ul className={styles["menu-list"]}>
          <li>
            <a>
              <BsFillThreadsFill size={18} style={{ top: "3px" }} />
              스레드
            </a>
            <NewIcon />
          </li>
          <li>
            <a>
              <TbSpeakerphone size={20} style={{ top: "4px" }} />
              홍보
            </a>
          </li>
          <li>
            <a>뉴스</a>
          </li>
          <li>
            <a>공지사항</a>
          </li>
          <li>
            <a>이용문의</a>
          </li>
          <li>
            <a>건의사항</a>
          </li>
        </ul>
        {user && (
          <div className={styles["bottom-area"]}>
            <button type="button" className={styles["logout-button"]}>
              <CiLogout size={20} />
              로그아웃
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
