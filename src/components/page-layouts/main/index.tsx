import type { JSX } from "react";

import styles from "./index.module.scss";

const MainPageLayout = (): JSX.Element => {
  return (
    <div className={styles['main-page-layout-component']}>
      Main page
    </div>
  );
};

export default MainPageLayout;