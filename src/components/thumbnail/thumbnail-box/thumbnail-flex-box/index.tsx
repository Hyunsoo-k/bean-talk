import type { JSX } from "react";

import RowThumbnailItem from "@/components/thumbnail/thumbnail-item/row-thumbnail-item";

import styles from "./index.module.scss";

const ThumbnailFlexBox = (): JSX.Element => {
  const list = [1, 2, 3, 4, 5, 6];

  return (
    <ul className={styles["thumbnail-flex-box-component"]}>
      {list.map(() => (
        <li className={styles["thumbnail-item-wrapper"]}>
          <RowThumbnailItem />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailFlexBox;
