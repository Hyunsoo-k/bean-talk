import type { JSX } from "react";

import type { Category } from "@/types/category";
import ThumbnailRow from "@/components/thumbnail/thumbnail-row";
import ThumbnailJob from "@/components/thumbnail/thumbnnail-job";
import Thread from "@/components/thread";

import styles from "./index.module.scss";

type Props = {
  category: Category;
};

const ThumbnailContainerFlex = ({ category }: Props): JSX.Element => {
  const list = [1, 2, 3];

  let thumbnailItem;

  if (category === "job") {
    thumbnailItem = <ThumbnailJob />;
  } else if (category === "thread") {
    thumbnailItem = <Thread />;
  } else {
    thumbnailItem = <ThumbnailRow />;
  }

  return (
    <ul className={styles["thumbnail-container-flex-component"]}>
      {list.map(() => (
        <li className={styles["thumbnail-wrapper"]}>
          {thumbnailItem}
        </li>
      ))}
    </ul>
  );
};

export default ThumbnailContainerFlex;
