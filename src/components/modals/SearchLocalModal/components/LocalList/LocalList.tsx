import type { Local } from "@/types/local";
import { LocalItem } from "./components/LocalItem/LocalItem";
import { LocalItemSkeleton } from "./components/LocalItemSkeleton/LocalItemSkeleton";

import styles from "./LocalList.module.scss";

type Props = {
  locals: Local[];
  isLoading: boolean;
  onClick: (local: Local) => void;
};

const LocalList = ({ locals, isLoading, onClick }: Props) => {
  return (
    <ul className={styles["local-list-component"]}>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
          <li key={`local-item-skeleton-${index}`} className={styles["local-item-wrapper"]}>
            <LocalItemSkeleton />
          </li>
        ))
        : locals.map((local: Local) => (
          <li key={`${local.address}-${local.placeName}`} className={styles["local-item-wrapper"]}>
            <LocalItem local={local} onClick={onClick} />
          </li>
        ))
      }
    </ul>
  );
};

export { LocalList };