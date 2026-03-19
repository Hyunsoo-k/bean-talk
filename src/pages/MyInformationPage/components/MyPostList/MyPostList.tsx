import type { RefObject } from "react";

import type { MyPost } from "@/types/myPost";
import { MyPostCard } from "./components/MyPostCard/MyPostCard";
import { MyPostCardSkeleton } from "./components/MyPostCardSkeleton/MyPostCardSkeleton";

import styles from "./MyPostList.module.scss";

type Props = {
  currentList: "myPosts" | "myScraps";
  myPosts: MyPost[];
  isLoading: boolean;
  ref: RefObject<HTMLLIElement | null>
};

const MyPostList = ({ currentList, myPosts, isLoading, ref }: Props) => {
  return (
    <ul className={styles["my-post-list-component"]}>
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <li
            key={`skeleton-${index}`}
            className={styles["post-card-wrapper"]}
          >
            <MyPostCardSkeleton />
          </li>
        ))
      }
      {
        !isLoading && myPosts.length === 0 && (
          <div className={styles["no-posts"]}>
            <p className={styles["message"]}>
              {currentList === "myPosts"
                ? "작성하신 게시글이 없습니다."
                : "스크랩한 게시글이 없습니다."
              }
            </p>
          </div>
        )
      }
      {myPosts.map((post, index) => (
        <li key={post._id}
          className={styles["post-card-wrapper"]}
          ref={index === myPosts.length - 1
            ? ref
            : null
          }
          >
          <MyPostCard myPost={post} />
        </li>
      ))}
    </ul>
  );
};

export { MyPostList };