import type { JSX } from "react";
import { useRef } from "react";

import type { Category } from "@/types";
import { useInfinitePosts, useInfiniteScrollObserver } from "@/components/PostList/hooks";
import { PostListHeader } from "@/components/PostLIstHeader";
import { PostList } from "@/components/PostList/PostList";

import styles from "./postListPage.module.scss";

type Props = {
  type: "flex" | "grid";
  cardType: "background" | "column" | "job" | "row" | "thread";
  category: Category;
  isRenderedOnMainPage: boolean;
};

const PostListPage = ({ 
  type,
  cardType,
  category,
  isRenderedOnMainPage
 }: Props): JSX.Element => {
  const lastPostRef = useRef<HTMLLIElement | null>(null);

  const {
    data: queryData,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePosts({ category });

  useInfiniteScrollObserver(
    lastPostRef,
    isRenderedOnMainPage,
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
        isRenderedOnMainPage={isRenderedOnMainPage}
        lastPostRef={lastPostRef}
      />
    </div>
  );
};

export { PostListPage };
