// src/hooks/useMapbox.js
import { useEffect, useState, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";

export const useMapbox = (containerRef) => {
   const [isReady, setIsReady] = useState(false);
   const [error, setError] = useState(null);
   const [userLocation, setUserLocation] = useState(null);

   const map = useRef(null);
   const markers = useRef([]);

   const getUserLocation = useCallback(() => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
         (position) => {
            const location = [position.coords.longitude, position.coords.latitude];
            setUserLocation(location);
         },
         () => setUserLocation(null),
         { timeout: 5000 }
      );
   }, []);

   useEffect(() => {
      const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      if (!token) {
         setError("Token no encontrado");
         return;
      }

      if (map.current || !containerRef.current) return;

      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
         container: containerRef.current,
         style: "mapbox://styles/mapbox/streets-v12",
         center: [0, 0],
         zoom: 2,
      });

      map.current.on("load", () => {
         setIsReady(true);
         getUserLocation();
      });

      return () => {
         if (map.current) {
            map.current.remove();
            map.current = null;
         }
      };
   }, [containerRef, getUserLocation]);

   const addMarkers = useCallback(
      (markersData) => {
         if (!map.current || !isReady) return;

         const markersArray = Array.isArray(markersData) ? markersData : [markersData];

         markersArray.forEach((data) => {
            const marker = new mapboxgl.Marker(data.element).setLngLat(data.coordinates).addTo(map.current);

            if (data.popup) marker.setPopup(data.popup);
            markers.current.push(marker);
         });
      },
      [isReady]
   );

   const fitToMarkers = useCallback(() => {
      if (!map.current || markers.current.length === 0) return;

      const coordinates = markers.current.map((m) => m.getLngLat());

      if (coordinates.length === 1) {
         map.current.flyTo({ center: [coordinates[0].lng, coordinates[0].lat], zoom: 14 });
      } else {
         const bounds = new mapboxgl.LngLatBounds();
         coordinates.forEach((coord) => bounds.extend(coord));
         map.current.fitBounds(bounds, { padding: 50 });
      }
   }, []);

   const goToUser = useCallback(() => {
      if (userLocation && map.current) {
         map.current.flyTo({ center: userLocation, zoom: 15 });
      }
   }, [userLocation]);

   const setStyle = useCallback((style) => {
      if (map.current) map.current.setStyle(style);
   }, []);

   return {
      isReady,
      error,
      userLocation,
      addMarkers,
      fitToMarkers,
      goToUser,
      setStyle,
   };
};
