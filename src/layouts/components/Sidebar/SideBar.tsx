import type { JSX } from "react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { BsFillThreadsFill } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { VscMegaphone } from "react-icons/vsc";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";

import { useAuthModal, useSidebar } from "@/zustand";
import { useGetNotifications, useGetUserMe, useLogout } from "@/hooks";
import { NewIcon } from "@/components/ui";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./Sidebar.module.scss";

const Sidebar = (): JSX.Element => {
  const location = useLocation();

  const {
    isOpen: isSidebarOpen,
    open: openSidebar,
    close: closeSidebar
  } = useSidebar();
  const { open: openAuthModal } = useAuthModal();
  const { data: userMeData } = useGetUserMe();
  const { data: NotificationsData } = useGetNotifications();
  const logout = useLogout();

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);

  const handleClickLoginButton = () => {
    openAuthModal();
    closeSidebar();
  };

  const handleClickLogoutButton = () => {
    logout();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className={styles["backdrop"]}
          style={{ overflow: isSidebarOpen ? "hidden" : ""  }}
        />
      )}
      <div className={`
        ${styles["sidebar-component"]} 
        ${isSidebarOpen ? styles["--open"] : styles["--close"]}`}>
        <div className={styles["top-area"]}>
          {userMeData ? (
            <div className={styles["logged-in"]}>
              <Link to="/me/information" className={styles["profile-image-wrapper"]}>
                <div
                  className={styles["profile-image"]}
                  style={{
                    backgroundImage: userMeData.profileImage
                      ? `url(${userMeData.profileImage})`
                      : `url(${defaultProfile})`
                  }}
                />
              </Link>
              <Link to="/me/notification">
                <GoBell size={25} color="#2C2C2C" />
              </Link>
              {NotificationsData?.length > 0 && (
                <div className={styles["red-dot"]} />
              )}
              <span className={styles["nickanme"]}>
                {userMeData.nickname}
              </span>
              <span className={styles["email"]}>
                {userMeData.email}
              </span>
            </div>
          ) : (
            <div className={styles["unlogged-in"]}>
              <span className={styles["phrase"]}>
                평범한 순간을
                <br />
                커피와 특별하게
              </span>
              <button
                type="button"
                onClick={handleClickLoginButton}
                className={styles["login-button"]}
              >
                빈톡 시작하기
              </button>
            </div>
          )}
        </div>
        <ul className={styles["menu-list"]}>
          <li>
            <Link to="/categories/thread/posts">
              <BsFillThreadsFill size={18} style={{ top: "3px" }} />
              스레드
              <NewIcon />
            </Link>
          </li>
          <li>
            <Link to="/categories/promotion/posts">
              <VscMegaphone
                size={20}
                color="rgb(210, 110, 105)"
                style={{ top: "4px" }}
              />
              홍보
              <NewIcon />
            </Link>
          </li>
          <li>
            <Link to="/categories/job/posts">
              <HiOutlineBuildingOffice size={20} style={{ top: "4px" }} />
              구인·구직
              <NewIcon />
            </Link>
          </li>
          <li>
            <Link to="/categories/news/posts">
              뉴스
              <NewIcon />
            </Link>
          </li>
          <li>
            <Link to="/categories/notice/posts">
              공지사항
              <NewIcon />
            </Link>
          </li>
        </ul>
        {userMeData && (
          <div className={styles["bottom-area"]}>
            <button
              type="button"
              onClick={handleClickLogoutButton}
              className={styles["logout-button"]}
            >
              <CiLogout size={20} />
              로그아웃
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export { Sidebar };
