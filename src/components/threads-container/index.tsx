import type { JSX } from "react";
import { useRef, useEffect } from "react";

import type { Post } from "@/types/post";
import useGetPostsQuery from "@/hooks/api/posts/use-get-posts-query";
import Thread from "@/components/thread";

import styles from "./index.module.scss";

type Props = {
  isRenderedOnMainPage: boolean;
};

const ThreadsContainer = ({ isRenderedOnMainPage }: Props): JSX.Element => {
  const threadContainerRef = useRef<HTMLLIElement | null>(null);

  const {
    data: queryData,
    hasNextPage,
    fetchNextPage
  } = useGetPostsQuery("thread");
  console.log(queryData);

  const allPosts: Post[] = queryData?.pages?.flatMap((page) => page.posts) ?? [];
  const postsToRender = isRenderedOnMainPage
    ? allPosts.slice(0, 4)
    : allPosts;

  useEffect(() => {
    const threadContainer = threadContainerRef.current;
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

  return (
    <ul className={styles["thread-container-component"]}>
      {postsToRender.map((post, index) => (
        <li
          key={post._id}
          className={styles["carousel-wrapper"]}
          ref={
            index === postsToRender.length - 1
              ? threadContainerRef
              : null
          }
        >
          <Thread post={post} />
        </li>
      ))}
    </ul>
  );
};

export default ThreadsContainer;
