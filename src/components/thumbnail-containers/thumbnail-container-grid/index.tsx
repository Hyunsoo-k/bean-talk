import type { JSX } from "react";

import ThumbnailBackground from "@/components/thumbnails/thumbnail-background";
import ThumbnailColumn from "@/components/thumbnails/thumbnail-column";

import styles from "./index.module.scss";

type Props = {
  thumbnailItemType: "background" | "column";
};

const ThumbnailContainerGrid = ({ thumbnailItemType }: Props): JSX.Element => {
  const thumbnailItemComponents = {
    background: ThumbnailBackground,
    column: ThumbnailColumn,
  };

  const ThumbnailItemComponent = thumbnailItemComponents[thumbnailItemType];

  const list = [1, 2, 3, 4, 5, 6, 7];

  return (
    <ul className={styles["thumbnail-container-grid-component"]}>
      {list.map((_, index: number) => (
        <li key={index} className={styles["thumbnail-wrapper"]}>
          <ThumbnailItemComponent />
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailContainerGrid;
