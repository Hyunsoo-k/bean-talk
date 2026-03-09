import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

import type { Notification } from "@/types";
import { formatDate } from "@/utils";
import { useCheckNotification, useDeleteNotification } from "./hooks";

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
          {nickname} <span>님이</span>
        </p>
        <p className={styles["created-at"]}>
          {formatDate(createdAt)}
        </p>
        <button
          type="button"
          disabled={isDeleting}
          className={styles["delete-button"]}
        >
          <RxCross2
            size={17}
            onClick={handleClickDelete}
            className={styles["cross-icon"]}
            color="rgb(44, 44, 44)"
          />
        </button>
      </div>
      <div className={styles["body"]}>
        <p className={styles["content"]}>
          {targetTitle}글에 <span>{type}</span>을 작성하였습니다.
        </p>
      </div>
    </Link>
  );
};

export { NotificationItem };