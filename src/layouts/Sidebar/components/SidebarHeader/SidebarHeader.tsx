import type { UserMe } from "@/types/userMe";
import { LoggedInProfile } from "./components/LoggedInProfile/LoggedInProfile";
import { LoggedOutProfile } from "./components/LoggedOutProfile/LoggedOutProfile";

import styles from "./SidebarHeader.module.scss";

type Props = {
  userMe: UserMe | undefined;
};

const SidebarHeader = ({ userMe }: Props) => {
  return (
    <header className={styles["sidebar-header-component"]}>
      {userMe
        ? <LoggedInProfile userMe={userMe} />
        : <LoggedOutProfile />
      }
    </header>
  )
};

export { SidebarHeader };