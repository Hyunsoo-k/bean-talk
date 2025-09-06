import { useState, type JSX } from "react";

import defaultProfile from "@/assets/default-images/default-profile.jpg";

import styles from "./index.module.scss";

const PostCreator = (): JSX.Element => {

  return (
    <div className={styles["post-creator-component"]}>
      <div className={styles["top"]}>
        <input
          placeholder="제목을 입력해 주세요."
          autoComplete="off"
          className={styles["title"]}
        />
        <div className={styles["information"]}>
          <div className={styles["profile-box"]}>
            <div
              className={styles["profile-image"]}
              style={{ backgroundImage: `url(${defaultProfile})` }}
            />
            <span className={styles["nickname"]}>운영자</span>
          </div>
          <div className={styles["button-box"]}>
            <button type="button" className={styles["cancel-button"]}>취소</button>
            <button className={styles["submit-button"]}>등록</button>
          </div>
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["content"]}>
          커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련 내용 커피관련
          
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
