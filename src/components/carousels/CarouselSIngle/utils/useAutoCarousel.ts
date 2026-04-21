import type { RefObject, Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";

const useAutoCarousel = (
  trackRef: RefObject<HTMLUListElement | null>,
  currentIndex: number,
  setCurrentIndex: Dispatch<SetStateAction<number>>,
  length: number
) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || length === 0) {
      return;
    }

    const item = track.children[currentIndex] as HTMLElement;
    if (item) {
      track.scrollTo({
        left: item.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [currentIndex, trackRef, length]);

  useEffect(() => {
    if (length <= 1) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [length, setCurrentIndex, currentIndex]); 
};

export { useAutoCarousel };