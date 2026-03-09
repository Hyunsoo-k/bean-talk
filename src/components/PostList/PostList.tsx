import type { RefObject } from "react";
import { useLocation } from "react-router-dom";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import {
  CARD_COMPONENT_MAP,
  CARD_SKELETON_COMPONENT_MAP
} from "./constants/cardComponentMaps";

import styles from "./PostList.module.scss";

type Props<T extends Category> = {
  type: "flex" | "grid";
  cardType: "background" | "column" | "job" | "row" | "thread";
  category: Category;
  posts: Post<T>[];
  isLoading: boolean;
  lastPostRef?: RefObject<HTMLLIElement | null>;
};

const PostList = <T extends Category>({
  type,
  cardType,
  category,
  posts,
  isLoading,
  lastPostRef
}: Props<T>) => {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";

  let postsToRender: Post<typeof category>[];

  if (isMainPage && (category === "promotion" || category === "news")) {
    postsToRender = posts.slice(0, 8);
  } else if (isMainPage && (category === "job" || category === "thread")) {
    postsToRender = posts.slice(0, 4);
  } else {
    postsToRender = posts;
  }

  const PostCard = CARD_COMPONENT_MAP[cardType];
  const PostSkeletonCard = CARD_SKELETON_COMPONENT_MAP[cardType];

  return (
    <ul className={`${styles["post-list-component"]} ${styles[type]}`}>
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <li
            key={`skeleton-${index}`}
            className={styles["post-card-wrapper"]}
          >
            <PostSkeletonCard />
          </li>
        ))
      }
      {!isLoading && postsToRender.map((post, index) => (
        <li
          key={post._id}
          className={styles["post-card-wrapper"]}
          ref={index === postsToRender.length - 1
            ? lastPostRef
            : null
          }
        >
          <PostCard category={category} post={post} />
        </li>
      ))}
    </ul>
  );
};

export { PostList };