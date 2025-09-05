import { useState, type JSX, type MouseEvent } from "react";
import { FaCamera } from "react-icons/fa";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import useUser from "@/zustand/useUser";
import ThreadsItemBox from "@/components/threads/threads-item-box";

import styles from "./index.module.scss";

const InformationPageLayout = (): JSX.Element => {
  const { user, setUser } = useUser();
  const [currentTab, setCurrentTab] = useState<"myPosts" | "myScrap">("myPosts");

  const handleClickTab = (e: MouseEvent<HTMLButtonElement>, tab: "myPosts" | "myScrap"): void => {
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
              backgroundImage: user?.profileImage ? `url(${user?.profileImage})` : `url(${defaultProfile})`,
            }}
          >
            <FaCamera size={20} color="rgb(44, 44, 44)" />
          </div>
          <span className={styles["nickname"]}>운영자</span>
          <span className={styles["email"]}>anthony117@naver.com</span>
        </div>
      </div>
      <div className={styles["content"]}>
        <div className={styles["header"]}>
          <button
            type="button"
            onClick={(e) => {
              handleClickTab(e, "myPosts");
            }}
            className={currentTab === "myPosts" ? styles["--selected"] : ""}
          >
            내 글
          </button>
          <button
            type="button"
            onClick={(e) => {
              handleClickTab(e, "myScrap");
            }}
            className={currentTab === "myScrap" ? styles["--selected"] : ""}
          >
            스크랩
          </button>
        </div>
        <ThreadsItemBox />
      </div>
    </div>
  );
};

export default InformationPageLayout;
