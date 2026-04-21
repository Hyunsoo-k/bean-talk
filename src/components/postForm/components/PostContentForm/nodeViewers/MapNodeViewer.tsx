import { useEffect, useRef } from "react";

import { NodeViewWrapper } from "@tiptap/react"

const MapNodeViewer = (props: any) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { lat, lng, address } = props.node.attrs;

  useEffect(() => {
    if (typeof window.kakao === "undefined" || !mapRef.current) {
      return;
    }

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({ position: markerPosition });

    marker.setMap(map);
  }, [lat, lng]);

  return (
    <NodeViewWrapper id="map-wrapper">
      <div id="map" ref={mapRef} />
      <div id="map-information">
        <span id="address">
          {address}
        </span>
      </div>
    </NodeViewWrapper>
  );
};

export { MapNodeViewer };