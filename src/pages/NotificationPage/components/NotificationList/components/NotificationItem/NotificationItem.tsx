import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

import type { Notification } from "@/types/notification";
import { formatDate } from "@/utils/formatDate";
import { useCheckNotification } from "./hooks/useCheckNotification";
import { useDeleteNotification } from "./hooks/useDeleteNotification";

import styles from "./NotifiactionItem.module.scss";

type Props = {
  notification: Notification;
};

const NotificationItem = ({ notification }: Props) => {
  const {
    _id,
    targetTitle,
    targetUrl,
    triggeredBy: {
      nickname,
    },
    type,
    createdAt,
    isChecked
  } = notification;

  const {mutate: checkNotification } = useCheckNotification(_id);
  const {
    mutate: deleteNotification,
    isPending: isDeleting
  } = useDeleteNotification(_id);

  const handleClickCheck = () => {
    checkNotification();
  };
  
  const handleClickDelete = (e: MouseEvent<SVGAElement>) => {
    e.preventDefault()
    e.stopPropagation();

    deleteNotification();
  };

  return (
    <Link
      to={targetUrl}
      onClick={handleClickCheck}
      className={styles["notification-item-component"]}
    >
      {!isChecked && <div className={styles["red-dot"]} />}
      <div className={styles["header"]}>
        <p className={styles["author"]}>
          <span className={styles["nickname"]}>{nickname}</span> 님이
        </p>
        <p className={styles["created-at"]}>
          {formatDate(createdAt)}
        </p>
        <button
          type="button"
          disabled={isDeleting}
          className={styles["delete-button"]}
        >
          <RxCross2 onClick={handleClickDelete} className={styles["cross-icon"]} />
        </button>
      </div>
      <div className={styles["body"]}>
        <p className={styles["content"]}>
          {targetTitle}글에 <span className={styles["type"]}>{type}</span>을 작성하였습니다.
        </p>
      </div>
    </Link>
  );
};

export { NotificationItem };