import { useState, type JSX, type MouseEvent } from "react";
import { FaCamera } from "react-icons/fa";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import useUser from "@/zustand/useUser";
import Threads from "@/components/threads";

import styles from "./index.module.scss";

const InformationPageLayout = (): JSX.Element => {
  const { user, setUser } = useUser();
  const [currentTab, setCurrentTab] = useState<"myThreads" | "scrap">("myThreads");

  const handleClickTab = (
    e: MouseEvent<HTMLButtonElement>,
    tab: "myThreads" | "scrap"
  ): void => {
    e.stopPropagation();
    setCurrentTab(tab);
  };

  // if (!user) return (<></>);

  return (
    <div className={styles["information-page-layout-component"]}>
      <div className={styles["top"]}>
        <div className={styles["profile-area"]}>
          <div
            className={styles["profile-image"]}
            style={{
              backgroundImage: user.profileImage ? `url(${user.profileImage})` : `url(${defaultProfile})`
            }}
          >
            <FaCamera size={20} color="rgb(44, 44, 44)" />
          </div>
          <span className={styles["nickname"]}>
            운영자
          </span>
          <span className={styles["email"]}>
            anthony117@naver.com
          </span>
        </div>
      </div>
      <div className={styles["content"]}>
        <div className={styles["header"]}>
          <button
            type="button"
            onClick={(e) => { handleClickTab(e, "myThreads"); }}
            className={currentTab === "myThreads" ? styles["--selected"] : ""}
          >
            내 스레드
          </button>
          <button
            type="button"
            onClick={(e) => { handleClickTab(e, "scrap"); }}
            className={currentTab === "scrap" ? styles["--selected"] : ""}
          >
            스크랩
          </button>
        </div>
        <ul className={styles["item-box"]}>
          <li>
            <Threads />
          </li>
          <li>
            <Threads />
          </li>
          <li>
            <Threads />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InformationPageLayout;