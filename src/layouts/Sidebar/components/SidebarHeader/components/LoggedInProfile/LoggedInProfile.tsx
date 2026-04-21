import { Link } from "react-router-dom";
import { PiBellLight } from "react-icons/pi";

import type { UserMe } from "@/types/userMe";
import { useGetNotifications } from "@/pages/NotificationPage/hooks/useGetNotifications";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./LoggedInProfile.module.scss";

type Props = {
  userMe: UserMe;
};

const LoggedInProfile = ({ userMe }: Props) => {
  const { data: notifications } = useGetNotifications();

  return (
    <div className={styles["logged-in-profile-component"]}>
      <Link to="/me/information" className={styles["profile-image-link"]}>
        <img 
          src={userMe.profileImageUrl || defaultProfile} 
          className={styles["profile-image"]} 
        />
      </Link>
      <Link to="/me/notification" className={styles["notification-link"]}>
        <PiBellLight className={styles["bell-icon"]} />
      </Link>
      {notifications?.length > 0 && <div className={styles["red-dot"]} />}
      <span className={styles["nickname"]}>
        {userMe.nickname}
      </span>
      <span className={styles["email"]}>
        {userMe.email}
      </span>
    </div>
  );
};

export { LoggedInProfile };