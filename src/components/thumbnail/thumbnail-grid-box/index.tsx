import type { JSX } from "react";

import BackgroundThumbnailItem from "@/components/thumbnail/thumbnail-item/background-thumbnail-item";
import ColumnThumbnailItem from "@/components/thumbnail/thumbnail-item/column-thumbnail-item";
import styles from "./index.module.scss";

type Props = {
  thumbnailItemType: "background" | "column";
};

const ThumbnailGridBox = ({ thumbnailItemType }: Props): JSX.Element => {
  const thumbnailItemComponents = {
    background: BackgroundThumbnailItem,
    column: ColumnThumbnailItem,
  };

  const ThumbnailItemComponent = thumbnailItemComponents[thumbnailItemType];

  const list = [1, 2, 3, 4, 5, 6, 7];

  return (
    <ul className={styles["thumbnail-grid-box-component"]}>
      {list.map((_, index: number )=> (
        <li key={index} className={styles["thumbnail-item-wrapper"]}>
          <ThumbnailItemComponent />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailGridBox;