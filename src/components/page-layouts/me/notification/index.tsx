import type { JSX } from "react";

import styles from "./index.module.scss";

const NotificationPageLayout = (): JSX.Element => {
  const NewIcon = (): JSX.Element => <div className={styles["new-icon"]}>N</div>

  return (
    <div className={styles["notification-page-layout-component"]}>
      <div className={styles["header"]}>알림</div>
      <ul className={styles["notification-list"]}>
        <li>
          <a>
            <div className={styles["content"]}>
              <span className={styles["nickname"]}>
                회원1 
              </span>
              님이
              <span className={styles["post-title"]}>
                아무제목스레드
              </span>
              글에
              <span className={styles["type"]}>댓글</span>을(를) 작성하셨습니다.
            </div>
            <div className={styles["date"]}>
              1시간 전
            </div>
            <NewIcon />
          </a>
        </li>
        <li>
          <a>
            <div className={styles["content"]}>
              <span className={styles["nickname"]}>
                회원1 
              </span>
              님이
              <span className={styles["post-title"]}>
                아무제목스레드
              </span>
              글에
              <span className={styles["type"]}>좋아요</span>을(를) 작성하셨습니다.
            </div>
            <div className={styles["date"]}>
              1시간 전
            </div>
            <NewIcon />
          </a>
        </li>
        <li>
          <a>
            <div className={styles["content"]}>
              <span className={styles["nickname"]}>
                회원1 
              </span>
              님이
              <span className={styles["post-title"]}>
                아무제목스레드
              </span>
              글에
              <span className={styles["type"]}>댓글</span>을(를) 작성하셨습니다.
            </div>
            <div className={styles["date"]}>
              1시간 전
            </div>            
          </a>
        </li>
        <li>
          <a>
            <div className={styles["content"]}>
              <span className={styles["nickname"]}>
                회원1 
              </span>
              님이
              <span className={styles["post-title"]}>
                아무제목스레드
              </span>
              글에
              <span className={styles["type"]}>댓글</span>을(를) 작성하셨습니다.
            </div>
            <div className={styles["date"]}>
              1시간 전
            </div>
          </a>
        </li>
        <li>
          <a>
            <div className={styles["content"]}>
              <span className={styles["nickname"]}>
                회원1 
              </span>
              님이
              <span className={styles["post-title"]}>
                아무제목스레드
              </span>
              글에
              <span className={styles["type"]}>댓글</span>을(를) 작성하셨습니다.
            </div>
            <div className={styles["date"]}>
              2025년 8월 30일
            </div>
          </a>
        </li>
        <li>
          <a>
            <div className={styles["content"]}>
              <span className={styles["nickname"]}>
                회원1 
              </span>
              님이
              <span className={styles["post-title"]}>
                아무제목스레드
              </span>
              글에
              <span className={styles["type"]}>댓글</span>을(를) 작성하셨습니다.
            </div>
            <div className={styles["date"]}>
              2025년 8월 30일
            </div>
          </a>
        </li>
        <li>
          <a>
            <div className={styles["content"]}>
              <span className={styles["nickname"]}>
                회원1 
              </span>
              님이
              <span className={styles["post-title"]}>
                아무제목스레드
              </span>
              글에
              <span className={styles["type"]}>댓글</span>을(를) 작성하셨습니다.
            </div>
            <div className={styles["date"]}>
              2025년 8월 30일
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NotificationPageLayout;