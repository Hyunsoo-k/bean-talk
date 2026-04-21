import { useAuthModalStore } from "@/zustand/useAuthModalStore";

import styles from "./UnLoggedinForm.module.scss";

const UnLoggedinForm = () => {
  const { open: openAuthModal } = useAuthModalStore();

  const handleClick = () => {
    openAuthModal();
  };

  return (
    <div className={styles["un-loggedin-form-component"]} onClick={handleClick}>
      <span className={styles["message"]}>
        로그인이 필요한 기능입니다.
      </span>
    </div>
  );
};

export { UnLoggedinForm };