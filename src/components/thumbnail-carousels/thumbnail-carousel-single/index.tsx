import type { JSX } from "react";
import {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";
import { GoLinkExternal } from "react-icons/go";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import useGetPostsQuery from "@/hooks/api/posts/use-get-posts-query";
import formatDateToKST from "@/utils/format-date-to-kst";
import ThumbnailBackground from "@/components/thumbnails/thumbnail-background";

import styles from "./index.module.scss";

type Props = {
  category: Category;
};

const ThumbnailCarouselSingle = ({ category }: Props): JSX.Element => {
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const thumbnailContainerRef = useRef<HTMLUListElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

 const { data: queryData } = useGetPostsQuery(category);

  const allPosts: Post[] = queryData?.pages?.flatMap((page) => page.posts) ?? [];
  const postsToRender = allPosts.slice(0, 5);

  const startAutoSlide = useCallback(() => {
    if (!postsToRender) {
      return;
    }

    const thumbnailContainer = thumbnailContainerRef.current as HTMLElement | null;
    if (!thumbnailContainer) {
      return;
    }

    intervalRef.current = setInterval(() => {
      const nextIndex = currentPostIndex >= postsToRender.length - 1 ? 0 : currentPostIndex + 1;
      setCurrentPostIndex(nextIndex);

      const targetThumbnail = thumbnailContainer.children[nextIndex] as HTMLElement;
      if (!targetThumbnail) {
        return;
      }

      thumbnailContainer.scrollTo({
        left: targetThumbnail.offsetLeft,
        behavior: "smooth",
      });
    }, 5000);
  }, [postsToRender, currentPostIndex]);

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoSlide]);

  const handleClickNavigationButton = (index: number): void => {
    setCurrentPostIndex(index);

    const thumbnailContainer = thumbnailContainerRef.current as HTMLElement | null;
    if (!thumbnailContainer) {
      return;
    }

    const targetThumbnail = thumbnailContainer.children[index] as HTMLElement;
    if (!targetThumbnail) {
      return;
    }

    thumbnailContainer.scrollTo({
      left: targetThumbnail.offsetLeft,
      behavior: "smooth",
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    startAutoSlide();
  };

  if (!postsToRender) {
    return (
      <div className={styles["thumbnail-carousel-single-skeleton-component"]}>
        <div className={styles["thumbnail-container-skeleton"]} />
        <div className={styles["information-skeleton"]} />
      </div>
    );
  }

  return (
    <div className={styles["thumbnail-carousel-single-component"]}>
      <div className={styles["gradient-overlay"]} />
      <ul ref={thumbnailContainerRef} className={styles["thumbnail-container"]}>
        {postsToRender.map((post: Post) => (
          <li
            key={post._id}
            data-post-id={post._id}
            className={styles["thumbnail-wrapper"]}
          >
            <ThumbnailBackground category={category} post={post} />
          </li>
        ))}
      </ul>
      <div className={styles["information"]}>
        <div className={styles["top"]}>
          <span className={styles["category"]}>
            {category}
          </span>
          <span className={styles["created-at"]}>
            {formatDateToKST(postsToRender[currentPostIndex]?.createdAt)}
          </span>
          <GoLinkExternal size={25} className={styles["link-icon"]} />
        </div>
        <div className={styles["body"]}>
          <h2 className={styles["title"]}>
            {postsToRender[currentPostIndex]?.title}
          </h2>
          <button className={styles["read-more-button"]}>
            Read more
          </button>
        </div>
        <div className={styles["bottom"]}>
          <ul className={styles["carousel-navigation"]}>
            {postsToRender.map((post: Post, index: number) => (
              <li key={post._id} className={styles["navigation-button-wrapper"]}>
                <button
                  onClick={() => handleClickNavigationButton(index)}
                  className={`
                    ${styles["navigation-button"]}
                    ${currentPostIndex === index
                      ? styles["navigation-button--active"]
                      : ""
                    }
                  `}
                >
                  <div
                    className={`
                      ${styles["button-line"]}
                      ${currentPostIndex === index ? styles["--active"] : ""}
                      `}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCarouselSingle;
