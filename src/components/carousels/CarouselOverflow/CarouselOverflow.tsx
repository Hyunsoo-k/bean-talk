import { useRef } from "react";

import type { Post } from "@/types/post";
import type { Category } from "@/types/category";
import { PostCardSimple } from "@/components/postCards/PostCardSimple/PostCardSimple";
import { PostCardPinterest } from "@/components/postCards/PostCardPinterest/PostCardPinterest";
import { PostCardSimpleSkeleton } from "@/components/postCardSkeletons/PostCardSimpleSkeleton/PostCardSimpleSkeleton";
import { PostCardPinterestSkeleton } from "@/components/postCardSkeletons/PostCardPinterestSkeleton/PostCardPinterestSkeleton";
import { CarouselNav } from "./components/CarouselNav/CarouselNav";

import styles from "./CarouselOverflow.module.scss";

type Props = {
  posts: Post<Category>[];
  isLoading: boolean;
  cardType: "pinterest" | "simple";
};

const CarouselOverflow = ({ posts, isLoading, cardType }: Props) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const CardComponent = cardType === "pinterest" ? PostCardPinterest : PostCardSimple;
  const SkeletonComponent = cardType === "pinterest" ? PostCardPinterestSkeleton : PostCardSimpleSkeleton;
  const postsToRender = posts.slice(0, 12);

  return (
    <div className={styles["container"]}>
      <div ref={trackRef} className={styles["carousel-overflow-component"]}>
        <ul className={styles["item-list"]}>
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
              <li
                key={`skeleton-${index}`}
                className={styles["item"]}
              >
                <SkeletonComponent />
              </li>
            ))
          }
          {postsToRender.map(post => (
            <li key={post._id} className={styles["item"]}>
              <CardComponent post={post} />
            </li>
          ))}
        </ul>
        <CarouselNav trackRef={trackRef} />
      </div>
    </div>
  );
};

export { CarouselOverflow };