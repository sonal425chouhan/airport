import React, { useEffect, useRef, useState, FC } from 'react';

import styles from './map.module.css';

interface MapProps {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  selectedAirports: any;
}

const Map: FC<MapProps> = ({ mapType, mapTypeControl, selectedAirports }) => {
  type GoogleMap = google.maps.Map;
  type Marker = google.maps.Marker;
  type Polyline = google.maps.Polyline;

  const defaultFlightPath = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  const [map, setGoogleMap] = useState<GoogleMap>();
  const [flightPlanCoordinates, setFlightPlanCoordinates] = useState<Coordinates[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [flightPath, setFlightPath] = useState<Polyline>(defaultFlightPath);

  const ref = useRef<HTMLDivElement>(null);

  const startMap = (): void => {
    if(!map) {
      defaultMapStart();
    }
  };
  // eslint-disable-next-line
  useEffect(() => startMap(), [map]);

  useEffect(() => {
    if(selectedAirports && selectedAirports.airport1 && selectedAirports.airport2) {
      removePreviousMarkers(); //remove previous markers
      setFlightPlanCoordinates([]);
      updateRoute();
    }
  // eslint-disable-next-line
  }, [selectedAirports]);

  const updateRoute = (): void => {
    const route: any = [], markers: any = [];

    for(let key in selectedAirports) {
      const { LATITUDE, LONGITUDE } = selectedAirports[key];
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(LATITUDE, LONGITUDE),
      });

      map && marker.setMap(map); //update markers
      route.push({lat: LATITUDE, lng: LONGITUDE});
      markers.push(marker);
      setMarkers(markers);
    }

    map && updatePolyLine(route, map);
    setFlightPlanCoordinates(route);
  }

  const updatePolyLine = (route: any = flightPlanCoordinates, map: google.maps.Map | null = null): void => {
    const newFlightPath: Polyline = flightPath;

    newFlightPath.setPath(route);
    newFlightPath.setMap(map);

    setFlightPath(newFlightPath);
  };

  const removePreviousMarkers = (): void => {
    markers.forEach((marker: Marker) => marker.setMap(null));
  };

  //initialize map
  const initMap = (zoomLevel: number, lat: number = 0, lng: number = 0): void => {
    if (ref.current) {
      setGoogleMap(new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: { lat: 50.064192, lng: -130.605469 },
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling:'cooperative',
          mapTypeId: mapType,
          draggableCursor: 'pointer',
        })
      );
    }
  };

  const defaultMapStart = (): void => {
    initMap(4, 37.0902, 95.7129); //USA
  };

  return (
    <div className={styles.map} id="map">
      <div ref={ref} className={styles.mapContainer}></div>
    </div>
  );
};

export default Map;

interface Coordinates {
  lat: number;
  lng: number;
}
