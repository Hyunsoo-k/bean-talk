import { useRef } from "react";
import { useLocation } from "react-router-dom";

import type { SearchTarget } from "@/types/searchTarget";
import type { QueryParams } from "@/types/queryParams";
import { useInfinitieScrollObserver } from "@/hooks/useInfinitieScrollObserver";
import { useInfinitieIntegratedPosts } from "./hooks/useInfinitieIntegratedPosts";
import { PostList } from "@/components/PostList/PostList";

import styles from "./IntegratedSearchPage.module.scss";

const IntegratedSearchPage = () => {
  const { search, pathname } = useLocation();
  const isMainPage = pathname === "/";

  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const searchParams = new URLSearchParams(search);

  const params: QueryParams = {
    searchTarget: searchParams.get("search-target") as SearchTarget,
    searchQuery: searchParams.get("search-query") as string,
  };

  const {
    data: queryData,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfinitieIntegratedPosts(params);

  useInfinitieScrollObserver(
    lastPostRef,
    isMainPage,
    hasNextPage,
    fetchNextPage
  );

  const posts = queryData?.pages?.flatMap((page) => page.posts) ?? [];

  return (
    <div className={styles["integrated-search-page-component"]}>
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>
          통합검색 결과
          <span className={styles["keyword"]}>
            "{params.searchQuery}"
          </span>
        </h2>
      </div>
      <PostList
        layout="flex"
        cardType="row"
        posts={posts}
        isLoading={isLoading}
        lastPostRef={lastPostRef}
      />
    </div>
    
  );
};

export { IntegratedSearchPage };