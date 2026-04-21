import styles from "./LocalItemSkeleton.module.scss";

const LocalItemSkeleton = () => {
  return (
    <div className={styles["local-item-skeleton-component"]}>
      <div className={styles["place-name"]} />
      <div className={styles["address"]} />
    </div>
  );
};

export { LocalItemSkeleton };