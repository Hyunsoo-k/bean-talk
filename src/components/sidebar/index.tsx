import { useRef, useEffect, type JSX } from "react";
import { BsFillThreadsFill } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { TbSpeakerphone } from "react-icons/tb";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import useSidebar from "@/zustand/useSidebar";
import useUser from "@/zustand/useUser";

import styles from "./index.module.scss";

const Sidebar = (): JSX.Element => {
  const { isOpen, setIsOpen } = useSidebar();
  const { user, setUser } = useUser();

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickBackDrop = (e: MouseEvent) => {
      if (!sidebarRef.current) return;
      const clickTarget = e.target as HTMLElement;
      
      if (!sidebarRef.current.contains(clickTarget)) setIsOpen(false);
    };

    document.addEventListener("click", handleClickBackDrop);

    return () => { document.removeEventListener("click", handleClickBackDrop)}
  }, []);

  const NewIcon = (): JSX.Element => <div className={styles["new-icon"]}>N</div>
  
  return (
    <>
      {isOpen && <div className={styles["backdrop"]}></div>}
      <div
        ref={sidebarRef}
        className={`${styles["sidebar-component"]} ${isOpen ? styles["--open"] : styles["--close"]}`}
      >
        <div className={styles["top-area"]}>
          {user
            ? (
                <div className={styles["logged-in"]}>
                  <div
                    className={styles["profile-image"]}
                    style={{
                      backgroundImage: user.profileImage
                        ? `url(${user.profileImage})`
                        : `url(${defaultProfile})`,
                    }}
                  />
                <GoBell size={25} />
                <div className={styles["red-dot"]}/>
                <span className={styles["nickanme"]}>
                  운영자
                </span>
                <span className={styles["email"]}>
                  baentalk@naver.com
                </span>
              </div>
              )
            : (
                <div className={styles["unlogged-in"]}>
                  <span className={styles["phrase"]}>
                    평범한 순간을<br/>
                    커피와 특별하게
                  </span>
                  <a>빈톡 시작하기</a>
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
            <a>공지사항</a>
          </li>
          <li>
            <a>이용문의</a>
          </li>
          <li>
            <a>건의사항</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;