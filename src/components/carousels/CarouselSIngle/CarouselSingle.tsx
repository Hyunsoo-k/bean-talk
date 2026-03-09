import type { JSX } from "react";
import { useState, useRef } from "react";
import { PiArrowCircleLeftThin } from "react-icons/pi";
import { PiArrowCircleRightThin } from "react-icons/pi";

import type { Post } from "@/types/post";
import { useAutoCarousel } from "./utils/useAutoSlide";
import { CarouselSingleItem } from "./components/CarouselSingleItem";

import defualtImage from "@/assets/default-images/default-image.jpg";
import styles from "./CarouselSingle.module.scss";

type Props = {
  posts: Post<"news">[];
};

const CarouselSingle = ({ posts }: Props): JSX.Element => {
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const containerRef = useRef<HTMLUListElement | null>(null);

  const postsToRender = posts.slice(0, 5);

  const {
    pause,
    resume,
    goNext,
    goPrev,
  } = useAutoCarousel({
    length: postsToRender.length,
    currentIndex: currentPostIndex,
    setCurrentIndex: setCurrentPostIndex,
    containerRef,
  });


  if (!postsToRender) {
    return (
      <div className={styles["carousel-single-skeleton-component"]}>
        <div className={styles["post-container-skeleton"]} />
        <div className={styles["information-skeleton"]} />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      className={styles["carousel-single-component"]}
      style={{ backgroundImage: defualtImage }}
    >
      <ul ref={containerRef} className={styles["item-container"]}>
        {postsToRender.map((post: Post<"news">) => (
          <li
            key={post._id}
            data-post-id={post._id}
            className={styles["item-wrapper"]}
          >
            <CarouselSingleItem post={post} />
          </li>
        ))}
      </ul>
      <div className={styles["arrow-button-box"]}>
        <PiArrowCircleLeftThin
          size={50}
          color="rgb(255,255,255)"
          onClick={goPrev}
        />
        <PiArrowCircleRightThin
          size={50}
          color="rgb(255,255,255)"
          onClick={goNext}
        />
      </div>
    </div>
  );
};

export { CarouselSingle };
