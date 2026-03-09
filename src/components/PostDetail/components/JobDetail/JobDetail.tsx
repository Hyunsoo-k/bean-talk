import type { JSX } from "react";

import styles from "./JobDetail.module.scss";
import type { Post } from "@/types";
import { JOB_DETAIL_FORM_MAP_TO_KOR } from "@/constants";
import { NaverMap } from "@/components/NaverMap";

type Props = {
  post: Post;
}

const JobDetail = ({ post }: Props): JSX.Element => {
  const {
    subCategory,
    employmentType,
    position,
    payAmount,
    startTime,
    endTime,
    address,
    latitude,
    longitude,
  } = post;
  return (
    <div className={styles["job-detail-component"]}>
			<div className={styles["grid"]}>
				<div className={styles["group"]}>
					<span className={styles["label"]}>
						{subCategory === "hiring"
              ? "고용 유형"
              : "지원 유형"
            }
					</span>
					<span className={styles["value"]}>
            {JOB_DETAIL_FORM_MAP_TO_KOR[employmentType]}
          </span>
				</div>
				<div className={styles["group"]}>
					<span className={styles["label"]}>
            {subCategory === "hiring"
              ? "모집 분야"
              : "지원 분야"
            }
					</span>
					<span className={styles["value"]}>
            {JOB_DETAIL_FORM_MAP_TO_KOR[position]}
          </span>
				</div>
				<div className={styles["group"]}>
					<span className={styles["label"]}>
						{employmentType === "partTime"
              ? "시급"
              : "월급"
            }
					</span>
          <span className={styles["value"]}>
            {payAmount}
          </span>
				</div>
				<div className={styles["group"]}>
					<span className={styles["label"]}>
						근무 시간
					</span>
					<div className={styles["dropdown-container-wrapper"]}>
            <span className={styles["value"]}>
              {startTime}
            </span>
            <span className={styles["time-separator"]}>
              ~
            </span>
						<span className={styles["value"]}>
              {endTime}
            </span>
					</div>
				</div>
				{subCategory === "hiring" && (
					<div className={styles["map-group"]}>
						<div className={styles["text-area"]}>
							<span className={styles["label"]}>
								매장 위치
							</span>
							<span>
                {address}
              </span>
						</div>
						<div className={styles["naver-map-wrapper"]}>
							<NaverMap latitude={latitude} longitude={longitude} />
						</div>
					</div>
				)}
			</div>
    </div>
  );
};

export { JobDetail};