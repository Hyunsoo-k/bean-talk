import { useState } from "react";

import type { Post } from "@/types/post";
import { useAutoCarousel } from "./utils/useAutoCarousel";
import { CarouselSingleItem } from "./components/CarouselSingleItem/CarouselSingleItem";
import { CarouselPagination } from "./components/CarouselPagination/CarouselPagination";
import { CarouselSingleItemSkeleton } from "./components/CarouselSingleItemSkeleton/CarouselSingleItemSkeleton";

import styles from "./CarouselSingle.module.scss";

type Props = {
  posts: Post<"news">[];
  isLoading: boolean;
};

const CarouselSingle = ({ posts, isLoading }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const postsToRender = posts.slice(0, 6);

  useAutoCarousel(currentIndex, setCurrentIndex, postsToRender.length);

  return (
    <div className={styles["carousel-single-component"]}>
      {isLoading
          ? <CarouselSingleItemSkeleton />
          : (
            <ul className={styles["item-list"]} style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
              {postsToRender.map((post) => (
                <li key={post._id} className={styles["item"]}>
                  <CarouselSingleItem post={post} />
                </li>
              ))}
            </ul>
          )
      }
      <CarouselPagination
        posts={postsToRender}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export { CarouselSingle };
