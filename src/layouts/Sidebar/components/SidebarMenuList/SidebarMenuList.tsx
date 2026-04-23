import type { InfiniteData } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BsFillThreadsFill } from "react-icons/bs";
import { RiQuillPenLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { VscMegaphone } from "react-icons/vsc";
import { IoNewspaperOutline } from "react-icons/io5";

import type { Post } from "@/types/post";
import type { Category } from "@/types/category";
import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { isWithinOneDay } from "@/utils/isWithinOneDay";
import { NewIcon } from "@/components/NewIcon/NewIcon";

import styles from "./SidebarMenuList.module.scss";

type PostInfiniteData = InfiniteData<{ posts: Post<Category>[] }>;

const MENU_ITEMS = [
  { to: "/categories/thread/posts", icon: BsFillThreadsFill, label: "스레드", key: "thread" },
  { to: "/categories/essay/posts", icon: RiQuillPenLine, label: "에세이", key: "essay" },
  { to: "/categories/exploration/posts", icon: CiLocationOn, label: "탐방", key: "exploration" },
  { to: "/categories/promotion/posts", icon: VscMegaphone, label: "홍보", key: "promotion" },
  { to: "/categories/news/posts", icon: IoNewspaperOutline, label: "뉴스", key: "news" },
  { to: "/categories/notice/posts", icon: null, label: "공지사항", key: "notice" },
];

const SidebarMenuList = () => {
  const dataMap = Object.fromEntries(
    MENU_ITEMS.map(({ key }) => [
      key,
      queryClient.getQueryData<PostInfiniteData>(QUERY_KEYS.posts(key as Category)),
    ])
  );

  return (
    <ul className={styles["sidebar-menu-list"]}>
      {MENU_ITEMS.map(({ to, icon: Icon, label, key }) => (
        <li key={to} className={styles["menu-list-item"]}>
          <Link to={to} className={styles["link"]}>
            {Icon && <Icon className={styles["icon"]} />}
            {label}
            {isWithinOneDay(dataMap[key]?.pages[0]?.posts[0]?.createdAt) && <NewIcon />}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export { SidebarMenuList };