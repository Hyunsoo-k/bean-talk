import type { MouseEvent } from "react";
import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";

import type { SearchTarget } from "../../../../../types/searchTarget";
import { SEARCH_TARGET_TO_KR_MAP } from "./constants/searchTargetToKrMap";
import { useClickOutside } from "@/hooks/useClickOutside";

import styles from "./SearchTargetDropdown.module.scss";

const SearchTargetDropdown = () => {
  const formMethods = useFormContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(
    containerRef,
    () => { setIsDropdownOpen(false); }
  );

  const currentSearchTarget = formMethods.watch("searchTarget");

  const handleTriggerClick = () => {
    setIsDropdownOpen((prev: boolean) => !prev);
  };

  const handleKeywordOptionClick = (
    e: MouseEvent<HTMLButtonElement>,
    value: SearchTarget
  ) => {
    formMethods.setValue("searchTarget", value);
    setIsDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className={styles["search-target-dropdown-component"]}>
      <button
        type="button"
        onClick={handleTriggerClick}
        className={styles["trigger"]}
      >
        {SEARCH_TARGET_TO_KR_MAP[currentSearchTarget as SearchTarget]}
        <IoIosArrowDown
          size={20}
          color="rgb(44, 44, 44)"
          className={styles["arrow-icon"]}
        />
      </button>
      <ul className={`${styles["drop-down"]} ${isDropdownOpen ? styles["open"] : styles["close"]}`}>
        <li className={styles["search-type-wrapper"]}>
          <button
            type="button"
            onClick={(e) => { handleKeywordOptionClick(e, "titleOrContent"); }}
            className={styles["search-type"]}
          >
            제목 + 내용
          </button>
        </li>
        <li className={styles["search-type-wrapper"]}>
          <button
            type="button"
            onClick={(e) => { handleKeywordOptionClick(e, "title"); }}
            className={styles["search-type"]}
          >
            제목
          </button>
        </li>
        <li className={styles["search-type-wrapper"]}>
          <button
           type="button"
           onClick={(e) => { handleKeywordOptionClick(e, "content"); }}
           className={styles["search-type"]}
          >
            내용
          </button>
        </li>
        <li className={styles["search-type-wrapper"]}>
          <button
           type="button"
           onClick={(e) => { handleKeywordOptionClick(e, "author"); }}
           className={styles["search-type"]}
          >
            작성자
          </button>
        </li>
      </ul>
    </div>
  );
};

export { SearchTargetDropdown };