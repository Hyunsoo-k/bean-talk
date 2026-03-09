import styles from "./BackDrop.module.scss";

type Props = {
  handleClickBackdrop: () => void;
  isBackdropOpen: boolean;
};

const BackDrop = ({
  handleClickBackdrop,
  isBackdropOpen
}: Props) => {
  return (
    <div
      onClick={handleClickBackdrop}
      className={styles["backdrop-component"]}
      style={{ overflow: isBackdropOpen ? "hidden" : ""  }}
    />
  )
};

export { BackDrop };