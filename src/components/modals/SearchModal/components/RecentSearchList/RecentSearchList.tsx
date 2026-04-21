import type { MouseEvent } from "react";

import type { RecentSearch } from "../../types/recentSearch";
import { RecentSearchItem } from "./components/RecentSearchItem/RecentSearchItem";

import styles from "./RecentSearchList.module.scss";

type Props = {
  recentSearches: RecentSearch[];
  onRecentSearchClick: (e: MouseEvent<HTMLAnchorElement>, searchQuery: string) => void;
  onRecentSearchDelete: (e: MouseEvent<HTMLButtonElement>, searchQuery: string) => void;
};

const RecentSearchList = ({
  recentSearches,
  onRecentSearchClick,
  onRecentSearchDelete
}: Props) => {
  return (
    <ul className={styles["recent-search-list-component"]}>
      {recentSearches.length === 0 ? (
        <p className={styles["no-history-message"]}>
          최근 검색어 내역이 없습니다.
        </p>
      ) : (
        recentSearches.map((recentSearch: RecentSearch) => (
          <li
            key={recentSearch.searchQuery}
            className={styles["recent-search-item-wrapper"]}
          >
            <RecentSearchItem
              recentSearch={recentSearch}
              onRecentSearchClick={onRecentSearchClick}
              onRecentSearchDelete={onRecentSearchDelete}
            />
          </li>
        ))
      )}
    </ul>
  );
};

export { RecentSearchList };