import { Link } from "react-router-dom";
import { BsFillThreadsFill } from "react-icons/bs";
import { VscMegaphone } from "react-icons/vsc";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";

import { isWithinOneDay } from "@/utils";
import { NewIcon } from "@/components/new-icon";

import styles from "./SidebarMenuList.module.scss";

type Props = {
  threadInfinitie: any;
  promotionInfinitie: any;
  jobInfinitie: any;
  newsInfinitie: any;
  noticeInfinitie: any;
};

const SidebarMenuList = ({
  threadInfinitie,
  promotionInfinitie,
  jobInfinitie,
  newsInfinitie,
  noticeInfinitie,
}: Props) => {
	return (
		<ul className={styles["sidebar-menu-list"]}>
			<li>
				<Link to="/categories/thread/posts">
					<BsFillThreadsFill size={18} style={{ top: "3px" }} />
					스레드
					{isWithinOneDay(threadInfinitie?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li>
				<Link to="/categories/promotion/posts">
					<VscMegaphone size={20} style={{ top: "4px" }} />
					홍보
					{isWithinOneDay(
						promotionInfinitie?.pages[0].posts[0].createdAt
					) && <NewIcon />}
				</Link>
			</li>
			<li>
				<Link to="/categories/job/posts">
					<HiOutlineBuildingOffice size={20} style={{ top: "4px" }} />
					구인·구직
					{isWithinOneDay(jobInfinitie?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li>
				<Link to="/categories/news/posts">
					<IoNewspaperOutline size={20} style={{ top: "4px" }} />
					뉴스
					{isWithinOneDay(newsInfinitie?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
			<li>
				<Link to="/categories/notice/posts">
					공지사항
					{isWithinOneDay(noticeInfinitie?.pages[0].posts[0].createdAt) && (
						<NewIcon />
					)}
				</Link>
			</li>
		</ul>
	);
};

export { SidebarMenuList };
