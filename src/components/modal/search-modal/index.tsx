import { useEffect, type JSX } from "react";
import { createPortal } from "react-dom";
import { CiSearch } from "react-icons/ci";
import { GoDot } from "react-icons/go";

import styles from "./index.module.scss";

const SearchModal = (): JSX.Element => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; }
  }, []);

  return createPortal((
    <div className={styles["search-modal-component"]}>
      <div className={styles["input-wrapper"]}>
        <input
          placeholder="검색어를 입력해 주세요."
          spellCheck="false"
          autoComplete="off"
        />
        <CiSearch size={30} />
      </div>
      <div className={styles["suggestion"]}>
        <span>이런 글들은 어떠세요?</span>
        <ul className={styles["suggestion-list"]}>
          <li>
            <GoDot />
            <a>공지사항공지사항공지사항공지사항공지사항공지사항공지사항공지사항</a>
          </li>
          <li>
            <GoDot />
            <a>공지사항공지사항공지사항공지사항</a>
          </li>
          <li>
            <GoDot />
            <a>공지사항공지사항공지사항공지사항</a>
          </li>
          <li>
            <GoDot />
            <a>공지사항공지사항공지사항공지사항</a>
          </li>
          <li>
            <GoDot />
            <a>공지사항공지사항공지사항공지사항</a>
          </li>
        </ul>
      </div>
    </div>
  ), document.body);
};

export default SearchModal;