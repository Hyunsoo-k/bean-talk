import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import type { RecentSearch } from "@/components/modals/SearchModal/types/recentSearch";
import { formatDate } from "@/utils/formatDate";

import styles from "./RecentSearchItem.module.scss";

type Props = {
  recentSearch: RecentSearch;
  handleRecentSearchItemClick: (e: MouseEvent<HTMLAnchorElement>, keyword: string) => void;
  handleRecentSearchItemDelete: (e: MouseEvent<HTMLButtonElement>, keyword: string) => void;
};

const RecentSearchItem = ({
  recentSearch,
  handleRecentSearchItemClick,
  handleRecentSearchItemDelete
}: Props) => {
  const { searchQuery, createdAt } = recentSearch;

  return (
    <Link
      to={`/integrated-posts?keyword=${searchQuery}`}
      onClick={(e) => { handleRecentSearchItemClick(e, searchQuery ); }}
      className={styles["recent-search-item-component"]}
    >
      <CiTimer
        size={15}
        color="rgb(44, 44, 44)"
        className={styles["timer-icon"]}
      />
      <span className={styles["search-query"]}>
        {searchQuery}
      </span>
      <span className={styles["created-at"]}>
        {formatDate(createdAt)}
      </span>
      <button
        type="button"
        onClick={(e) => { handleRecentSearchItemDelete(e, searchQuery); }}
        className={styles["delete-search-query-button"]}
      >
        <RxCross2
          size={15}
          color="rgb(44, 44, 44)"
          className={styles["cross-icon"]}
        />
      </button>
    </Link>
  );
};

export { RecentSearchItem };


