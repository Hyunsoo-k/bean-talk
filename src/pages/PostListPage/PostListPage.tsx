import { useRef } from "react";
import { useLocation } from "react-router-dom";

import type {
  Category,
  CategoryHavingSubCategory,
  SubCategory
} from "@/types/category";
import type { QueryParams } from "@/types/queryParams";
import type { SearchTarget } from "@/types/searchTarget";
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

const PostListPage = ({ type, cardType, category }: Props)=> {
  const { pathname, search } = useLocation();
  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const isMainPage = pathname === "/";
  const params = new URLSearchParams(search);
  const queryParams: QueryParams = {
    subCategory: params.get("sub-category") as SubCategory<CategoryHavingSubCategory> | null,
    searchTarget: params.get("search-target") as SearchTarget | null,
    searchQuery: params.get("search-query")
  };

  const {
    data: queryData,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePosts(category, queryParams);

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
