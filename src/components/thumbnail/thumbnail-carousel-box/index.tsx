import type { JSX } from "react";

import BackgroundThumbnailItem from "@/components/thumbnail/thumbnail-item/background-thumbnail-item";
import ColumnThumbnailItem from "@/components/thumbnail/thumbnail-item/column-thumbnail-item";
import RowThumbnailItem from "@/components/thumbnail/thumbnail-item/row-thumbnail-item";

import styles from "./index.module.scss";

type Props = {
  thumbnailItemType: "background" | "column" | "row";
};

const ThumbnailCarouselBox = ({ thumbnailItemType }: Props): JSX.Element => {
  const thumbnailItemComponents = {
    background: BackgroundThumbnailItem,
    column: ColumnThumbnailItem,
    row: RowThumbnailItem,
  };

  const ThumbnailItemComponent = thumbnailItemComponents[thumbnailItemType];

  return (
    <ul className={styles["thumbnail-carousel-box-component"]}>
      {[1, 2, 3, 4, 5].map((_, index: number) => (
        <li key={index} className={styles["thumbnail-item-wrapper"]}>
          <ThumbnailItemComponent />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailCarouselBox;
