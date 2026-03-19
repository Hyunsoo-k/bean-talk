import type { JSX } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

import type { Category } from "@/types/category";
import { useInfinitePosts } from "@/hooks/useInfinitiePosts";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";
import { PostListHeader } from "@/components/PostListHeader/PostListHeader";
import { PostList } from "@/components/PostList/PostList";

import styles from "./postListPage.module.scss";

type Props = {
  type: "flex" | "grid";
  cardType: "background" | "column" | "job" | "row" | "thread";
  category: Category;
};

const PostListPage = ({ 
  type,
  cardType,
  category,
 }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";

  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const {
    data: queryData,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePosts({ category });

  useInfiniteScrollObserver(
    lastPostRef,
    isMainPage,
    hasNextPage,
    fetchNextPage
  );

  const posts = queryData?.pages?.flatMap((page) => page.posts) ?? [];

  return (
    <div className={styles["post-list-page-component"]}>
      <PostListHeader category={category} />
      <PostList
        type={type}
        cardType={cardType}
        category={category}
        posts={posts}
        isLoading={isLoading}
        lastPostRef={lastPostRef}
      />
    </div>
  );
};

export { PostListPage };
