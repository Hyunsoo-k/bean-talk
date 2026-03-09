import type { MouseEvent } from "react";
import { useRef, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

import type { UserMe } from "@/types";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants";
import { useEditUserModalStore } from "@/zustand";
import { useInfiniteScrollObserver } from "@/hooks";
import { useInfiniteMyPosts, useInfinitieScraps } from "./hooks";
import { FullPageSpinner } from "@/components/spinners";
import { MyPostList } from "./components/MyPostList";

import defaultImage from "@/assets/default-images/default-profile.jpg"
import styles from "./MyInformationPage.module.scss";

const MyInformationPage = () => {
  const [currentList, setCurrentList] = useState<"myPosts" | "myScraps">("myPosts");

  const userMe: UserMe | undefined = queryClient.getQueryData(QUERY_KEYS.userMe);

  const { open: openEditUserModal } = useEditUserModalStore();

  const {
    isLoading: isMyPostsLoading,
    data: myPostsPages,
    hasNextPage: hasNextMyPostsPage,
    fetchNextPage: fetchNextMyPostsPage,
  } = useInfiniteMyPosts();
  const {
    isLoading: isMyScrapsLoading,
    data: myScrapsPages,
    hasNextPage: hasNextScrapsPage,
    fetchNextPage: fetchNextScrapsPage
  } = useInfinitieScraps();

  const myPosts = myPostsPages?.pages?.flatMap((page) => page.posts) ?? [];
  const myScraps = myScrapsPages?.pages?.flatMap((page) => page.posts) ?? [];

  const lastMyPostRef = useRef<HTMLLIElement | null>(null);
  const lastScrapRef = useRef<HTMLLIElement | null>(null);

  useInfiniteScrollObserver(
    lastMyPostRef,
    false,
    hasNextMyPostsPage,
    fetchNextMyPostsPage
  );

  useInfiniteScrollObserver(
    lastMyPostRef,
    false,
    hasNextScrapsPage,
    fetchNextScrapsPage
  );

  const handleClickSettingIcon = () => {
    openEditUserModal();
  };

  const handleSetCurrentList = (
    e: MouseEvent<HTMLButtonElement>,
    list: "myPosts" | "myScraps"
  ) => {
    setCurrentList(list);
  };

  if (!userMe) {
    return (
      <FullPageSpinner />
    );
  }
  
  return (
    <div className={styles["my-information-page-component"]}>
      <div className={styles["profile"]}>
        <div className={styles["profile-image-wrapper"]}>
          <img
            src={userMe.profileImageUrl ?? defaultImage}
            className={styles["profile-image"]}
          />
          <div
            onClick={handleClickSettingIcon}
            className={styles["setting-icon-wrapper"]}
          >
            <IoSettingsSharp
              size={15}
              color="rgb(255,255,255)"
              className={styles["setting-icon"]}
            />
          </div>
      </div>
      <div className={styles["text"]}>
        <p className={styles["nickname"]}>
          {userMe.nickname}
        </p>
        <p className={styles["email"]}>
          {userMe.email}
        </p>
      </div>
      </div>
      <ul className={styles["my-activity"]}>
        <li className={styles["my-activity-button-wrapper"]}>
          <button
            type="button"
            onClick={(e) => handleSetCurrentList(e, "myPosts")}
            className={`${styles["my-activity-button"]} ${currentList === "myPosts" ? styles["active"] : ""}`}
          >
            내가 쓴 글
          </button>
        </li>
        <li className={styles["my-activity-button-wrapper"]}>
          <button
            type="button"
           onClick={(e) => handleSetCurrentList(e, "myScraps")}
            className={`${styles["my-activity-button"]} ${currentList === "myScraps" ? styles["active"] : ""}`}
          >
            스크랩
          </button>
        </li>
      </ul>
      <MyPostList
        currentList={currentList}
        myPosts={currentList === "myPosts" ? myPosts : myScraps}
        isLoading={currentList === "myPosts" ? isMyPostsLoading : isMyScrapsLoading}
        ref={currentList === "myPosts" ? lastMyPostRef : lastScrapRef}
      />
    </div>
  );
};

export { MyInformationPage };