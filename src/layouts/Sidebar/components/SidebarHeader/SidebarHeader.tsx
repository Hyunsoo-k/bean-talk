import { Link } from "react-router-dom";
import { PiBellLight } from "react-icons/pi";

import type { Notification, UserMe } from "@/types";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./SidebarHeader.module.scss";

type Props = {
  userMe: UserMe | undefined;
  notifications: Notification[];
  handleClickLoginButton: () => void;
};

const SidebarHeader = ({
  userMe,
  notifications,
  handleClickLoginButton
}: Props) => {
  return (
    <div className={styles["sidebar-header-component"]}>
      {userMe ? ( 
        <div className={styles["logged-in"]}>
          <Link to="/me/information" className={styles["profile-image-wrapper"]}>
            <div
              className={styles["profile-image"]}
              style={{
                backgroundImage: `url(${userMe.profileImageUrl || defaultProfile})`
              }}
            />
          </Link>
          <Link to="/me/notification">
            <PiBellLight size={25} color="#2C2C2C" />
          </Link>
          {notifications?.length > 0 && (
            <div className={styles["red-dot"]} />
          )}
          <span className={styles["nickanme"]}>
            {userMe.nickname}
          </span>
          <span className={styles["email"]}>
            {userMe.email}
          </span>
        </div>
      ) : (
        <div className={styles["unlogged-in"]}>
          <span className={styles["phrase"]}>
            평범한 순간을
            <br />
            커피와 특별하게
          </span>
          <button
            type="button"
            onClick={handleClickLoginButton}
            className={styles["login-button"]}
          >
            빈톡 시작하기
          </button>
        </div>
      )}
    </div>
  )
};

export { SidebarHeader };