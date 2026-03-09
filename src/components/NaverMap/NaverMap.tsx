import type { JSX } from "react";
import { useEffect, useRef } from "react";

import styles from "./NaverMap.module.scss";

type Props = {
  latitude: number;
  longitude: number;
};

const NaverMap = ({ latitude, longitude }: Props): JSX.Element => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (!containerRef.current) return;

      const center = new naver.maps.LatLng(latitude, longitude);

      mapRef.current = new naver.maps.Map(containerRef.current, {
        center,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      markerRef.current = new naver.maps.Marker({
        position: center,
        map: mapRef.current,
      });
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) {
      return;
    }

    const position = new naver.maps.LatLng(latitude, longitude);

    mapRef.current.setCenter(position);
    markerRef.current.setPosition(position);
  }, [latitude, longitude]);

  return (
    <div ref={containerRef} className={styles["naver-map-component"]}/>
  );
};

export { NaverMap };
