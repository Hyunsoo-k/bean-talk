import type { RefObject } from "react";
import { useLocation } from "react-router-dom";

import type { Category } from "@/types/category";
import type { PostListLayout } from "@/types/postListLayout";
import type { Post } from "@/types/post";
import type { CardType } from "@/types/cardType";
import { CARD_COMPONENT_MAP, CARD_SKELETON_COMPONENT_MAP } from "./constants/cardComponentMaps";
import { NoPostsView } from "./components/NoPostsView/NoPostsView";

import styles from "./PostList.module.scss";

type Props<T extends Category> = {
  layout: PostListLayout;
  cardType: CardType;
  posts: Post<T>[];
  isLoading: boolean;
  category?: T;
  lastPostRef?: RefObject<HTMLLIElement | null>;
};

const PostList = <T extends Category>({
  layout,
  cardType,
  posts,
  isLoading,
  category,
  lastPostRef
}: Props<T>) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  let postsToRender: Post<T>[] = [...posts];
  if (isHomePage && (category === "promotion" || category === "news")) {
    postsToRender = posts.slice(0, 8);
  } else if (isHomePage && category === "essay") {
    postsToRender = posts.slice(0, 12);
  } else if (isHomePage && category == "thread") {
    postsToRender = posts.slice(0, 4);
  }

  if (!isLoading && postsToRender.length === 0) {
    return <NoPostsView />
  }

  const CardComponent = CARD_COMPONENT_MAP[cardType];
  const SkeletonComponent = CARD_SKELETON_COMPONENT_MAP[cardType];

  return (
    <ul className={`${styles["post-list-component"]} ${styles[layout]}`}>
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <li
            key={`skeleton-${index}`}
            className={styles["post-card-wrapper"]}
          >
            <SkeletonComponent {...(cardType === "simple" && { noStaticWidth: true })} />
          </li>
        ))
      }
      {!isLoading && postsToRender.length === 0 && (
        <p className={styles["no-posts-message"]}>
          게시글이 없습니다.
        </p>
      )}
      {!isLoading && postsToRender.map((post, index) => (
        <li
          key={post._id}
          className={styles["post-card-wrapper"]}
          ref={index === postsToRender.length - 1
            ? lastPostRef
            : null
          }
        >
          <CardComponent post={post} {...(cardType === "simple" && { noStaticWidth: true })} />
        </li>
      ))}
    </ul>
  );
};

export { PostList };