import type { RefObject } from "react";
import { useEffect } from "react";

const useClickOutside = (
  targetRef: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const targetElement = targetRef.current;

      if (targetElement && !targetElement.contains(target)) {
        callback();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [targetRef, callback]);
};

export { useClickOutside };