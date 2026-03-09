import type { JSX } from "react";
import type { Address } from "react-daum-postcode";
import { CiSearch } from "react-icons/ci";
import { useDaumPostcodePopup } from "react-daum-postcode";

import styles from "./DaumPostCode.module.scss";

const SCRIPT_URL = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

type Props = {
  setAddress: (
		address: string,
		latitude: number,
		longitude: number
	) => void;
};

const DaumPostCode = ({ setAddress }: Props): JSX.Element => {
  const open = useDaumPostcodePopup(SCRIPT_URL);

  const geocodeWithNaver = (address: string) => {
		naver.maps.Service.geocode(
			{
				query: address
			},
			(status, response) => {
				if (status !== naver.maps.Service.Status.OK) {
					return;
				}

				const result = response.v2.addresses[0];
				if (!result) {
					return;
				}

				const latitude = Number(result.y);
				const longitude = Number(result.x);

				setAddress(address, latitude, longitude);
			}
		);
	};

  const handleComplete = (data: Address) => {
    const address = data.roadAddress || data.jibunAddress;

    geocodeWithNaver(address);
  };

  return (
    <button
			type="button"
			onClick={() => open({ onComplete: handleComplete })}
			className={styles["daum-post-code-component"]}
		>
			주소 검색
		</button>
  );
};

export { DaumPostCode };
