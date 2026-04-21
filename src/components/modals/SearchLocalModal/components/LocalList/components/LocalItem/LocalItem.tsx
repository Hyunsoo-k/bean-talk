import type { Local } from "@/types/local";

import styles from "./localItem.module.scss";

type Props = {
  local: Local;
  onClick: (local: Local) => void;
};

const LocalItem = ({ local, onClick }: Props) => {

  return (
    <div onClick={() => { onClick(local); }} className={styles["local-item-component"]}>
      <strong className={styles["place-name"]}>
        {local.placeName}
      </strong>
      <span className={styles["address"]}>
        {local.address}
      </span>
    </div>
  );
};

export { LocalItem };