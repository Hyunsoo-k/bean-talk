import type { RefObject } from "react";
import { useEffect } from "react";

const useInfiniteScrollObserver = (
  targetRef: RefObject<HTMLLIElement | null>,
  isRenderedOnMainPage: boolean,
  hasNextPage: boolean,
  fetchNextPage: () => void
) => {
  useEffect(() => {
    const target = targetRef.current;
    if (!target || isRenderedOnMainPage) {
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

    io.observe(target);

    return () => {
      return io.disconnect();
    };
  }, [targetRef, hasNextPage, fetchNextPage, isRenderedOnMainPage]);
};

export { useInfiniteScrollObserver };