import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";

const useAutoCarousel = (
  currentIndex: number,
  setCurrentIndex: Dispatch<SetStateAction<number>>,
  length: number
) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (length === 0) {
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