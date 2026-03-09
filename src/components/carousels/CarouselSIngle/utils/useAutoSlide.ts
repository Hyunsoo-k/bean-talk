import { useEffect, useRef, useCallback } from "react";

export const useAutoCarousel = ({
  length,
  currentIndex,
  setCurrentIndex,
  containerRef,
  delay = 5000,
}: Params) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;
      if (!container) return;

      const target = container.children[index] as HTMLElement | undefined;
      if (!target) return;

      container.scrollTo({
        left: target.offsetLeft,
        behavior,
      });
    },
    [containerRef]
  );

  const goNext = useCallback(() => {
    if (!length) return;
    const next = currentIndex >= length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(next);
    scrollToIndex(next);
  }, [length, currentIndex, setCurrentIndex, scrollToIndex]);

  const goPrev = useCallback(() => {
    if (!length) return;
    const prev = currentIndex <= 0 ? length - 1 : currentIndex - 1;
    setCurrentIndex(prev);
    scrollToIndex(prev);
  }, [length, currentIndex, setCurrentIndex, scrollToIndex]);

  const start = useCallback(() => {
    if (intervalRef.current || !length) return;
    intervalRef.current = setInterval(goNext, delay);
  }, [goNext, delay, length]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      scrollToIndex(currentIndex, "auto");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, scrollToIndex]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return {
    pause: stop,
    resume: start,
    goNext,
    goPrev,
  };
};
