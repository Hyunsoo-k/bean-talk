import { useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import type { SearchType } from "@/types/SearchType";
import type { PostsParams } from "@/types/postsParams";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";
import { useInfiniteIntegratedSearch } from "./hooks/useInfiniteIntegratedSearch";
import { PostList } from "@/components/PostList/PostList";

import styles from "./IntegratedSearchPage.module.scss";

const IntegratedSearchPage = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const isMainPage = pathname === "/";
  const params: PostsParams = {
    type: searchParams.get("type") as SearchType,
    query: searchParams.get("query") as string,
  };

  const {
    data: queryData,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteIntegratedSearch(params);

  useInfiniteScrollObserver(
    lastPostRef,
    isMainPage,
    hasNextPage,
    fetchNextPage
  );

  const posts = queryData?.pages?.flatMap((page) => page.posts) ?? [];

  return (
    <div className={styles["integrated-search-page-component"]}>
      <header className={styles["header"]}>
        <h2 className={styles["title"]}>
          통합검색 결과
          <span className={styles["search-query"]}>
            "{params.query}"
          </span>
        </h2>
      </header>
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