import { CiLogout } from "react-icons/ci";

import styles from "./SidebarFooter.module.scss";

type Props = {
  handleClickLogoutButton: () => void;
};

const SidebarFooter = ({ handleClickLogoutButton }: Props) => {
  return (
    <div className={styles["sidebar-footer-component"]}>
      <button
        type="button"
        onClick={handleClickLogoutButton}
        className={styles["logout-button"]}
      >
        <CiLogout size={20} />
        로그아웃
      </button>
    </div>
  )
};

export { SidebarFooter };