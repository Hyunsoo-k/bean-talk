import { useGetNotifications } from "@/hooks";
import { NotificationList } from "@/pages/NotificationPage/components/NotificationList";

import styles from "./Notification.page.module.scss";

const Notificationpage = ()=> {
  const { data: queryData } = useGetNotifications();

  return (
    <div className={styles["notification-page-component"]}>
      <h2 className={styles["title"]}>
        알림
      </h2>
      <NotificationList notifications={queryData} />
    </div>
  );
};

export { Notificationpage };