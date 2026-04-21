import { useEffect } from "react";

const useMapRenderer = (isLoading: boolean, content: string) => {
  useEffect(() => {
    if (isLoading || !window.kakao || !window.kakao.maps) {
      return;
    }

    const mapContainers = document.querySelectorAll('div[data-type="map"]');

    mapContainers.forEach((container) => {
      if (container.getAttribute('data-rendered') === 'true') {
        return;
      }

      const lat = parseFloat(container.getAttribute("lat") || "0");
      const lng = parseFloat(container.getAttribute("lng") || "0");
      const mapElement = container.querySelector("#map") as HTMLElement;

      if (mapElement && lat && lng) {
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapElement, options);
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        container.setAttribute('data-rendered', 'true');
        
        map.relayout();
      }
    });
  }, [isLoading, content]);
};

export { useMapRenderer };