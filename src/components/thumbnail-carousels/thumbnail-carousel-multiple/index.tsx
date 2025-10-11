import type { JSX } from "react";
import { useRef, useEffect } from "react";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import useGetPostsQuery from "@/hooks/api/posts/use-get-posts-query";
import ThumbnailColumn from "@/components/thumbnails/thumbnail-column";

import styles from "./index.module.scss";

type Props = {
  category: Category;
  isRenderedOnMainPage: boolean;
};

const ThumbnailCarouselMultiple = ({ category, isRenderedOnMainPage }: Props): JSX.Element => {
  const thumbnailContainerRef = useRef<HTMLUListElement | null>(null);

  const {
    data: queryData,
    hasNextPage,
    fetchNextPage
  } = useGetPostsQuery(category);

  const allPosts: Post[] = queryData?.pages?.flatMap((page) => page.posts) ?? [];
  const postsToRender = isRenderedOnMainPage
    ? allPosts.slice(0, 4)
    : allPosts;

  useEffect(() => {
    const threadContainer = thumbnailContainerRef.current;
    if (!threadContainer || isRenderedOnMainPage) {
      return;
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        threshold: 1
      }
    );

    io.observe(threadContainer);

    return () => {
      return io.disconnect();
    };
  }, [hasNextPage, fetchNextPage, isRenderedOnMainPage]);

  if (!postsToRender) {
    return <ul></ul>;
  }

  return (
    <ul ref={thumbnailContainerRef} className={styles["thumbnail-carousel-multiple-component"]}>
      {postsToRender.map((post: Post) => (
        <li key={post._id} className={styles["thumbnail-wrapper"]}>
          <ThumbnailColumn post={post} />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailCarouselMultiple;
