import { SlExclamation } from "react-icons/sl";

import styles from "./NoPostsView.module.scss";

const NoPostsView = () => {
  return (
    <div className={styles["no-posts-view-component"]}>
      <SlExclamation color="rgb(44, 44, 44)" className={styles["no-file-icon"]} />
      <div className={styles["message-area"]}>
        <h3 className={styles["title"]}>
          검색결과가 없습니다.
        </h3>
        <p className={styles["message"]}>
          정확한 검색어인지 확인하시고 다시 검색해주세요.
        </p>
      </div>
    </div>
  );
};

export { NoPostsView };