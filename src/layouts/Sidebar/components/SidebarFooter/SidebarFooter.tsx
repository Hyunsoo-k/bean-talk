import { CiLogout } from "react-icons/ci";

import { useLogout } from "@/hooks/useLogout";

import styles from "./SidebarFooter.module.scss";

const SidebarFooter = () => {
  const logout = useLogout();

  return (
    <div className={styles["sidebar-footer-component"]}>
      <button
        type="button"
        onClick={logout}
        className={styles["logout-button"]}
      >
        <CiLogout className={styles["icon"]} />
        로그아웃
      </button>
    </div>
  )
};

export { SidebarFooter };