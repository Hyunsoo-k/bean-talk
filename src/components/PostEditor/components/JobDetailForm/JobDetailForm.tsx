
import type { MouseEvent } from "react";
import { useState, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { SlArrowDown } from "react-icons/sl";

import { JOB_DETAIL_FORM_MAP_TO_ENG } from "@/constants/jobDetailFormMap";
import { JOB_DETAIL_FORM_MAP_TO_KOR } from "@/constants/jobDetailFormMap";
import { NaverMap } from "@/components/NaverMap/NaverMap";
import { DaumPostCode } from "./components/DaumPostCode/DaumPostCode";
import { Dropdown } from "@/components/Dropdown";

import styles from "./JobDetailForm.module.scss";

const TIME_ITEMS = Array.from({ length: 48 }, (_, i) => {
	const hour = String(Math.floor(i / 2)).padStart(2, "0");
	const minute = i % 2 === 0 ? "00" : "30";
	return `${hour}:${minute}`;
});

type DropdownType = "employmentType" | "position" | "startTime" | "endTime" | null;

const JobDetailForm = () => {
	const {
		watch,
		formState: { errors },
		setValue,
		register
	} = useFormContext();
	const [openedDropdown, setOpenedDropdown] = useState<DropdownType>(null);

	const employmentType = watch("employmentType");
	const address = watch("address");
	const latitude = watch("latitude");
	const longitude = watch("longitude");
	const startTime = watch("startTime");
	const endTime = watch("endTime");
	const position = watch("position");

	const toggleDropdown = useCallback((label: DropdownType) => {
		setOpenedDropdown((prev) => (prev === label ? null : label));
	}, []);

	const setAddress = useCallback((
		address: string,
		latitude: number,
		longitude: number
	) => {
		setValue("address", address);
		setValue("latitude", latitude);
		setValue("longitude", longitude);
	}, [setValue]);

	const handleEmploymentTypeClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
		const value = e.currentTarget.textContent;
		if (value) {
			setValue("employmentType", JOB_DETAIL_FORM_MAP_TO_ENG[value]);
			setOpenedDropdown(null);
		}
	}, [setValue]);

	const handlePositionClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
		const value = e.currentTarget.textContent;
		if (value) {
			setValue("position", JOB_DETAIL_FORM_MAP_TO_ENG[value]);
			setOpenedDropdown(null);
		}
	}, [setValue]);

	const handleStartTimeClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
		setValue("startTime", e.currentTarget.textContent);
		setOpenedDropdown(null);
	}, [setValue]);

	const handleEndTimeClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
		setValue("endTime", e.currentTarget.textContent);
		setOpenedDropdown(null);
	}, [setValue]);

	const payAmountLabel = useMemo(() => 
		employmentType === "fullTime" ? "월급" : "시급",
		[employmentType]
	);

	const payAmountInputClassname = useMemo(() => 
		`${styles["input-wrapper"]} ${
			employmentType === "fullTime"
				? styles["full-time"]
				: styles["part-time"]
		}`,
		[employmentType]
	);

	return (
		<div className={styles["job-detail-form-component"]}>
			<div className={styles["form-grid"]}>
				<div className={styles["form-group"]}>
					<label className={styles["label"]}>
						고용 유형
					</label>
					<div className={styles["dropdown-container"]}>
						<button
							type="button"
							onClick={() => toggleDropdown("employmentType")}
							className={styles["selected"]}
							aria-label="고용 유형 선택"
							aria-expanded={openedDropdown === "employmentType"}
						>
							{JOB_DETAIL_FORM_MAP_TO_KOR[employmentType]}
							<SlArrowDown
								size={13}
								color="rgb(44, 44, 44)"
								className={styles["arrow-icon"]}
							/>
						</button>
						<Dropdown
							isOpen={openedDropdown === "employmentType"}
							items={[
								JOB_DETAIL_FORM_MAP_TO_KOR["partTime"],
								JOB_DETAIL_FORM_MAP_TO_KOR["fullTime"],
							]}
							handleClickItem={handleEmploymentTypeClick}
						/>
					</div>
				</div>
				<div className={styles["form-group"]}>
					<label className={styles["label"]}>
						{watch("subCategory") === "hiring"
							? "모집 분야"
							: "지원 분야"
						}
					</label>
					<div className={styles["dropdown-container"]}>
						<button
							type="button"
							onClick={() => toggleDropdown("position")}
							className={styles["selected"]}
							aria-label="모집 분야 선택"
							aria-expanded={openedDropdown === "position"}
						>
							{JOB_DETAIL_FORM_MAP_TO_KOR[position]}
							<SlArrowDown
								size={13}
								color="rgb(44, 44, 44)"
								className={styles["arrow-icon"]}
							/>
						</button>
						<Dropdown
							isOpen={openedDropdown === "position"}
							items={[
								JOB_DETAIL_FORM_MAP_TO_KOR["barista"],
								JOB_DETAIL_FORM_MAP_TO_KOR["manager"],
							]}
							handleClickItem={handlePositionClick}
						/>
					</div>
				</div>
				<div className={styles["form-group"]}>
					<label htmlFor="payAmount" className={styles["label"]}>
						{payAmountLabel}
					</label>
					<div className={payAmountInputClassname}>
						<input
							id="payAmount"
							type="text"
							inputMode="numeric"
							autoComplete="off"
							className={styles["input"]}
							placeholder={
								errors.salary
									? String(errors.salary.message)
									: "금액을 입력하세요."
							}
							min={0}
							{...register(
								"payAmount",
								{
									required: "필수 값 입니다.",
									onChange: (e) => {
										e.target.value = e.target.value.replace(/[^0-9]/g, "");
									},
									validate: (value) => {
										if (value === null) {
											return "필수 값 입니다."
										}

										if (Number(value) <= 0) {
											return "0보다 큰 값을 입력하세요";
										}

										return true;
									}
								}
							)}
						/>
						{errors["payAmount"] && (
							<small className={styles["error-message"]}>
								{errors["payAmount"].message}
							</small>
						)}
					</div>
				</div>
				<div className={styles["form-group"]}>
					<label htmlFor="workingHours" className={styles["label"]}>
						근무 시간
					</label>
					<div className={styles["dropdown-container-wrapper"]}>
						<div
							className={`${styles["dropdown-container"]} ${styles["office-hour"]}`}
						>
							<button
								type="button"
								onClick={() => toggleDropdown("startTime")}
								className={styles["selected"]}
								aria-label="근무 시작 시간 선택"
								aria-expanded={openedDropdown === "startTime"}
							>
								{startTime}
								<SlArrowDown
									size={13}
									color="rgb(44, 44, 44)"
									className={styles["arrow-icon"]}
								/>
							</button>
							<Dropdown
								isOpen={openedDropdown === "startTime"}
								items={TIME_ITEMS}
								handleClickItem={handleStartTimeClick}
							/>
						</div>
						<span className={styles["time-separator"]}>
							~
						</span>
						<div
							className={`${styles["dropdown-container"]} ${styles["office-hour"]}`}
						>
							<button
								type="button"
								onClick={() => toggleDropdown("endTime")}
								className={styles["selected"]}
								aria-label="근무 종료 시간 선택"
								aria-expanded={openedDropdown === "endTime"}
							>
								{endTime}
								<SlArrowDown
									size={13}
									color="rgb(44, 44, 44)"
									className={styles["arrow-icon"]}
								/>
							</button>
							<Dropdown
								isOpen={openedDropdown === "endTime"}
								items={TIME_ITEMS}
								handleClickItem={handleEndTimeClick}
							/>
						</div>
					</div>
				</div>
				{watch("subCategory") === "hiring" && (
					<div className={styles["map-group"]}>
						<div className={styles["text-area"]}>
							<label htmlFor="location" className={styles["label"]}>
								매장 위치
							</label>
							<div className={styles["input-wrapper"]}>
								<input
									id="location"
									readOnly
									spellCheck={false}
									placeholder="주소를 입력해주세요."
									value={address || ""}
									{...register(
										"address",
										{
											required: "필수 값 입니다."
										}
									)}
									className={styles["input"]}
								/>
								{errors["address"] && (
									<small className={styles["error-message"]}>
										{errors["address"].message}
									</small>
								)}
							</div>
							<div className={styles["daum-post-code-wrapper"]}>
								<DaumPostCode setAddress={setAddress} />
							</div>
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

export { JobDetailForm };