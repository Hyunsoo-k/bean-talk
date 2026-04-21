import styles from "./BackDrop.module.scss";

type Props = {
  onBackdropClick: () => void;
  isBackdropOpen: boolean;
};

const BackDrop = ({ onBackdropClick, isBackdropOpen }: Props) => {
  return (
    <div
      onClick={onBackdropClick}
      className={styles["backdrop-component"]}
      style={{ overflow: isBackdropOpen ? "hidden" : ""  }}
    />
  )
};

export { BackDrop };