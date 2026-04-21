import type { RefObject } from "react";
import { useRef } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { PiArrowRightThin } from "react-icons/pi";

import styles from "./CarouselNav.module.scss";

type Props ={
  trackRef: RefObject<HTMLDivElement | null>;
};

const CarouselNav = ({ trackRef }: Props) => {
  const isScrollActive = useRef<boolean>(false);

  const handleSlideClick = (direction: "prev" | "next"): void => {
    if (isScrollActive.current) {
      return;
    }
    isScrollActive.current = true;

    const $carouselArticle = trackRef.current;
    if (!$carouselArticle) {
      return;
    }

    const post = $carouselArticle.firstElementChild as HTMLElement;
    if (!post) {
      return;
    }

    const postWidth = 240;
    const gap = 20;
    const scrollAmount = (postWidth + gap) * 2;

    $carouselArticle.scrollBy({
      left: direction === "prev" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollActive.current = false;
    }, 300);
  };

  return (
    <div className={styles["carousel-nav-component"]}>
      <button
        onClick={() => { handleSlideClick("prev"); }}
        className={`${styles["slide-button"]} ${styles["prev"]}`}
      >
        <PiArrowLeftThin className={styles["arrow-icon"]} />
      </button>
      <button
        onClick={() => { handleSlideClick("next"); }}
        className={`${styles["slide-button"]} ${styles["next"]}`}
      >
        <PiArrowRightThin className={styles["arrow-icon"]} />
      </button>
    </div>
  );
};

export { CarouselNav };