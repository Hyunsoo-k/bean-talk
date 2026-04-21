import { useAuthModalStore } from "@/zustand/useAuthModalStore";
import { useSidebarStore } from "@/zustand/useSidebarStore";

import styles from "./LoggedOutProfile.module.scss";

const LoggedOutProfile = () => {
  const { open: openAuthModal } = useAuthModalStore();
  const { close: closeSidebar } = useSidebarStore();

  const handleLoginClick = () => {
    openAuthModal();
    closeSidebar();
  };

	return (
		<div className={styles["logged-out-profile-component"]}>
			<p className={styles["phrase"]}>
				평범한 순간을
				<br />
				커피와 특별하게
			</p>
			<button
				type="button"
				onClick={handleLoginClick}
				className={styles["login-button"]}
			>
				빈톡 시작하기
			</button>
		</div>
	);
};

export { LoggedOutProfile };
