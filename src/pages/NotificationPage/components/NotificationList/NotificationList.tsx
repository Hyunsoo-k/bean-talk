import { PiBellSlashLight } from "react-icons/pi";

import type { Notification } from "@/types";
import { NotificationItem } from "./components/NotificationsCard";

import styles from "./NotificationList.module.scss";

type Props = {
  notifications: Notification[];
};

const NotificationList = ({ notifications }: Props) => {
  if (!notifications) {
    return <></>
  }
  
  return (
    <ul className={styles["notification-list-component"]}>
      {notifications.length === 0 ? (
        <div className={styles["no-notifications"]}>
          <PiBellSlashLight
            color="rgb(44, 44, 44)"
            className={styles["no-notifications-bell-icon"]}
          />
          <p className={styles["no-notifications-text"]}>
            알림이 없습니다.
          </p>
        </div>
      ) : (
        notifications.map((notification: Notification) => (
          <li key={notification._id} className={styles["notification-item-wrapper"]}>
            <NotificationItem notification={notification} />
          </li>
        ))
      )} 
    </ul>
  );
};

export { NotificationList };