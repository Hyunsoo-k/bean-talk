import { Link } from "react-router-dom";
import { BsFillThreadsFill } from "react-icons/bs";
import { RiQuillPenLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { VscMegaphone } from "react-icons/vsc";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";

import { queryClient } from "@/constants/queryClient";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { isWithinOneDay } from "@/utils/isWithinOneDay";
import { NewIcon } from "@/components/NewIcon/NewIcon";

import styles from "./SidebarMenuList.module.scss";

const SidebarMenuList = () => {

	const threadInfinite = queryClient.getQueryData(QUERY_KEYS.posts("thread"));
  const promotionInfinite = queryClient.getQueryData(QUERY_KEYS.posts("promotion"));
  const jobInfinite = queryClient.getQueryData(QUERY_KEYS.posts("job"));
  const newsInfinite = queryClient.getQueryData(QUERY_KEYS.posts("news"));
  const noticeInfinite = queryClient.getQueryData(QUERY_KEYS.posts("notice"));

	return (
		<ul className={styles["sidebar-menu-list"]}>
			<li className={styles["menu-list-item"]}>
				<Link to="/categories/thread/posts" className={styles["link"]}>
					<BsFillThreadsFill className={styles["icon"]} />
					스레드
					{isWithinOneDay(threadInfinite?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li className={styles["menu-list-item"]}>
				<Link to="/categories/essay/posts" className={styles["link"]}>
				<RiQuillPenLine className={styles["icon"]} />
					에세이
					{isWithinOneDay(noticeInfinite?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li className={styles["menu-list-item"]}>
				<Link to="/categories/exploration/posts" className={styles["link"]}>
				<CiLocationOn className={styles["icon"]} />
					탐방
					{isWithinOneDay(noticeInfinite?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li className={styles["menu-list-item"]}>
				<Link to="/categories/promotion/posts" className={styles["link"]}>
					<VscMegaphone className={styles["icon"]} />
					홍보
					{isWithinOneDay(
						promotionInfinite?.pages[0].posts[0].createdAt
					) && <NewIcon />}
				</Link>
			</li>
			<li className={styles["menu-list-item"]}>
				<Link to="/categories/job/posts" className={styles["link"]}>
					<HiOutlineBuildingOffice className={styles["icon"]} />
					구인·구직
					{isWithinOneDay(jobInfinite?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li className={styles["menu-list-item"]}>
				<Link to="/categories/news/posts" className={styles["link"]}>
					<IoNewspaperOutline className={styles["icon"]} />
					뉴스
					{isWithinOneDay(newsInfinite?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li className={styles["menu-list-item"]}>
				<Link to="/categories/notice/posts" className={styles["link"]}>
					공지사항
					{isWithinOneDay(noticeInfinite?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
		</ul>
	);
};

export { SidebarMenuList };
