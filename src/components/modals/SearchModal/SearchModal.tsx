import type { MouseEvent } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { createPortal } from "react-dom";
import { CiSearch } from "react-icons/ci";

import type { RecentSearch } from "./types/recentSearch";
import type { SearchFormValues } from "./types/serachFormValues";
import { useSearchModalStore } from "@/zustand/useSearchModalStore";
import { SearchTargetDropdown } from "./components/SearchTargetDropdown/SearchTargetDropdown";
import { RecentSearchList } from "./components/RecentSearchList/RecentSearchList";

import styles from "./SearchModal.module.scss";

const SearchModal = () => {
  const LOCAL_STORAGE_KEY = "beanTalkRecentSearches";
  const INITIAL_RECENT_SEARCHES: RecentSearch[] =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");

  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(INITIAL_RECENT_SEARCHES);
  const { context, category } = useSearchModalStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    }
  }, []);

  const isInHeader = context === "header";

  const formMethods = useForm<SearchFormValues>({
    mode: "onChange",
    defaultValues: {
      searchTarget: "titleOrContent",
      searchQuery: "",
    }
  });

  const handleSubmit = (formValue: SearchFormValues) => {
    const { searchTarget, searchQuery } = formValue;

    const queryExists = recentSearches.some(
      (recentSearch) => recentSearch.searchQuery === searchQuery
    );

    let updatedRecentSearches: RecentSearch[];

    if (queryExists) {
      const existing = recentSearches.find(
        (recentSearch) => recentSearch.searchQuery === searchQuery
      ) as RecentSearch;

      updatedRecentSearches = [
        existing,
        ...recentSearches.filter(
          (recentSearch) => recentSearch.searchQuery !== searchQuery
        )
      ];
    } else {
      const newRecentSearch: RecentSearch = {
        searchQuery,
        createdAt: new Date().toISOString()
      };

      updatedRecentSearches = [newRecentSearch, ...recentSearches];
    }

    updatedRecentSearches = updatedRecentSearches.slice(0, 10);

    setRecentSearches(updatedRecentSearches);

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(updatedRecentSearches)
    );

    const destination = isInHeader 
      ? `/integrated-search?search-target=${searchTarget}&search-query=${searchQuery}`
      : `/categories/${category}/posts?search-target=${searchTarget}&search-query=${searchQuery}`

    navigate(destination);
  };

  const handleRecentSearchClick = (
    e: MouseEvent<HTMLAnchorElement>,
    searchQuery: string
  ) => {
    const trimeedSearchQuery = searchQuery.trim();

    const newRecentSearch = {
      searchQuery: trimeedSearchQuery,
      createdAt: new Date().toISOString(),
    };

    const filteredRecentSearches = recentSearches.filter((recentSearch: RecentSearch) => {
      return recentSearch.searchQuery !== trimeedSearchQuery;
    });

    filteredRecentSearches.unshift(newRecentSearch);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredRecentSearches));
  };

  const handleRecentSearchDelete = (
    e: MouseEvent<HTMLButtonElement>,
    searchQuery: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const filteredRecentSearches = recentSearches.filter((recentSearch: RecentSearch) => {
      return recentSearch.searchQuery !== searchQuery;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredRecentSearches));
    setRecentSearches(filteredRecentSearches);
  };

  return createPortal((
    <div className={styles["search-modal-component"]}>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className={styles["form"]}
        >
          <SearchTargetDropdown />
          <div className={styles["input-wrapper"]}>
            <input
              placeholder={isInHeader ? "통합 검색" : "검색어를 입력해 주세요."}
              spellCheck="false"
              autoComplete="off"
              {...formMethods.register(
                "searchQuery",
                {
                  required: "검색어를 입력해 주세요.",
                  minLength: {
                    value: 2,
                    message: "2자 이상 입력해 주세요."
                  }
                }
              )}
              className={styles["input"]}
            />
            <button className={styles["search-button"]}>
              <CiSearch
                size={30}
                color="rgb(44, 44, 44)"
                className={styles["search-icon"]}
              />
            </button>
            {formMethods.formState.errors.searchQuery && (
              <small className={styles["error-message"]}>
                {formMethods.formState.errors.searchQuery.message}
              </small>
            )}
          </div>
        </form>
      </FormProvider>
      <div className={styles["recent-search-area"]}>
        <p className={styles["recent-search-title"]}>
          최근 검색어
        </p>
        <RecentSearchList
          recentSearches={recentSearches}
          onRecentSearchClick={handleRecentSearchClick}
          onRecentSearchDelete={handleRecentSearchDelete}
        />
      </div>
    </div>
  ), document.body);
};

export { SearchModal };