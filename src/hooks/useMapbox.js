// src/hooks/useMapbox.js - VERSIÓN CORREGIDA
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

            if (map.current) {
               map.current.flyTo({ center: location, zoom: 15 });
            }
         },
         (error) => {
            console.warn("No se pudo obtener la ubicación:", error.message);
            setUserLocation(null);
         },
         { timeout: 10000, enableHighAccuracy: true }
      );
   }, []);

   useEffect(() => {
      const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

      if (!token) {
         setError("Token no encontrado");
         return;
      }

      if (map.current) return;

      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
         container: containerRef.current,
         style: "mapbox://styles/mapbox/streets-v12",
         center: [-66.1568, -17.3895],
         zoom: 12,
      });

      map.current.on("load", () => {
         setIsReady(true);
         getUserLocation();
      });

      map.current.on("error", (e) => {
         console.error("Error del mapa:", e);
         setError("Error al cargar el mapa");
      });

      return () => {
         if (map.current) {
            map.current.remove();
            map.current = null;
            setIsReady(false);
         }
      };
   }, [containerRef, getUserLocation]);

   const addMarkers = useCallback(
      (markersData) => {
         if (!map.current || !isReady) return;

         const markersArray = Array.isArray(markersData) ? markersData : [markersData];

         markersArray.forEach((data) => {
            const marker = new mapboxgl.Marker(data.element).setLngLat(data.coordinates).addTo(map.current);

            if (data.popupContent) {
               const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(data.popupContent);
               marker.setPopup(popup);
            }

            markers.current.push(marker);
         });
      },
      [isReady]
   );

   const fitToMarkers = useCallback(() => {
      if (!map.current || markers.current.length === 0) return;

      const coordinates = markers.current.map((m) => m.getLngLat());

      if (coordinates.length === 1) {
         map.current.flyTo({
            center: [coordinates[0].lng, coordinates[0].lat],
            zoom: 14,
         });
      } else {
         const bounds = new mapboxgl.LngLatBounds();
         coordinates.forEach((coord) => bounds.extend(coord));
         map.current.fitBounds(bounds, { padding: 50 });
      }
   }, []);

   const goToUser = useCallback(() => {
      if (userLocation && map.current) {
         map.current.flyTo({ center: userLocation, zoom: 15 });
      } else {
         getUserLocation();
      }
   }, [userLocation, getUserLocation]);

   const setStyle = useCallback((style) => {
      if (map.current) {
         map.current.setStyle(style);
      }
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
