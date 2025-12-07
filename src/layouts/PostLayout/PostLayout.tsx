import type { JSX } from "react";

import styles from "./PostLayout.module.scss";

const PostLayout = (): JSX.Element => {
  return (
    <div className={styles["post-layout-component"]}></div>
  );
};

export { PostLayout };