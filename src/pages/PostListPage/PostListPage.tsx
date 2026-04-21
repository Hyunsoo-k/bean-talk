import { useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import type { Category, CategoryHavingSubCategory, SubCategory } from "@/types/category";
import type { CardType } from "@/types/cardType";
import type { PostsParams } from "@/types/postsParams";
import type { SearchType } from "@/types/SearchType";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";
import { PostListHeader } from "@/components/PostListHeader/PostListHeader";
import { PostList } from "@/components/PostList/PostList";

import styles from "./postListPage.module.scss";

type Props = {
  type: "flex" | "grid";
  cardType: CardType;
  category: Category;
};

const PostListPage = ({ type, cardType, category }: Props)=> {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const params: PostsParams = {
    "sub-category": (searchParams.get("sub-category") as SubCategory<CategoryHavingSubCategory>) ?? undefined,
    "type": (searchParams.get("type") as SearchType) ?? undefined,
    "query": searchParams.get("query") ?? undefined,
  };
  const {
    flattenedData,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePosts(category, params);

  const isMainPage = pathname === "/";
  useInfiniteScrollObserver(
    lastPostRef,
    isMainPage,
    hasNextPage,
    fetchNextPage
  );

  return (
    <div className={styles["post-list-page-component"]}>
      <PostListHeader key={category} category={category} />
      <PostList
        layout={type}
        cardType={cardType}
        category={category}
        posts={flattenedData}
        isLoading={isLoading}
        lastPostRef={lastPostRef}
      />
    </div>
  );
};

export { PostListPage };
