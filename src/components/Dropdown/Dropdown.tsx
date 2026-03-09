import type { JSX, MouseEvent } from "react";

import styles from "./Dropdown.module.scss";

type Props = {
  isOpen: boolean;
  items: string[];
  handleClickItem: (e: MouseEvent<HTMLLIElement>) => void;
};

const Dropdown = ({ isOpen, items, handleClickItem }: Props): JSX.Element => {
  return (
    <ul className={`${styles["dropdown-component"]} ${isOpen ? styles["open"] : ""}`}>
      {items.map((value: string) => (
        <li
          key={value}
          onClick={handleClickItem}
          className={styles["dropdown-item"]}
        >
          {value}
        </li>
      ))}
    </ul>
  );
};

export { Dropdown };