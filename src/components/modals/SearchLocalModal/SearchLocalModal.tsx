import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

import type { Local } from "@/types/local";
import { useSearchLocalModalStore } from "@/zustand/useSearchLocalModalStore";
import { useInfiniteLocals } from "./hooks/useInfiniteLocals";
import { useScrollLock } from "@/hooks/useScrollLock";
import { LocalList } from "./components/LocalList/LocalList";

import styles from "./SearchLocalModal.module.scss"

type SearchFormValues = {
  "query": string;
};

const SearchLocalModal = () => {
  const [query, setQuery] = useState<string>("");
  const { isOpen, close, editor } = useSearchLocalModalStore();
  const { flattenedLocals, isLoading } = useInfiniteLocals(query);
  const {
    handleSubmit: handleRHFSubmit,
    register
  } = useForm<SearchFormValues>({ mode: "onChange" });

  useScrollLock(isOpen);

  const handleSubmit = (value: SearchFormValues) => {
    const { query } = value;

    setQuery(query);
  };

  const handleClickBackdrop = (): void => {
    close();
  };

  const handleSelectLocal = (local: Local) => {
    if (!editor) {
      return;
    }

    const { lat, lng, address } = local;

    editor.chain().focus().setMap({ lat, lng, address }).run();
    
    close();
  };

  return createPortal(
    <>
      <div onClick={handleClickBackdrop} className={styles["backdrop"]} />
      <div className={styles["search-local-modal-component"]}>
        <form onSubmit={handleRHFSubmit(handleSubmit)} className={styles["form"]}>
          <input
            placeholder="주소 혹은 장소를 입력해 주세요."
            spellCheck={false}
            autoComplete="off"
            {...register("query", {
              minLength: {
                value: 2,
                message: "검색어는 2자 이상 입력해 주세요."
              }
            })}
            className={styles["input"]}
          />
          <button className={styles["submit-button"]}>
            <CiSearch className={styles["search-icon"]} />
          </button>
        </form>
        {query && flattenedLocals
          ? <LocalList
              locals={flattenedLocals}
              isLoading={isLoading}
              onClick={handleSelectLocal}
            />
          : (
            <div className={styles["initial-view"]}>
              <CiLocationOn className={styles["location-icon"]} />
              <span className={styles["message"]}>
                장소를 첨부하세요.
              </span>
            </div>
          )
        }
        {query && !isLoading && flattenedLocals.length === 0 && (
          <div className={styles["search-information"]}>
            <strong className={styles["title"]}>
              검색결과가 없습니다.
            </strong>
            <span className={styles["description"]}>
              검색어를 확인하신 후 다시 검색해 주세요.
            </span>
          </div>
        )}
      </div>
    </>,
    document.body
  )
};

export { SearchLocalModal };