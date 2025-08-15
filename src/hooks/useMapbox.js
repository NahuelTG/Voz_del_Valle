// src/hooks/useMapbox.js - CON GEOLOCATE CONTROL
import { useEffect, useState, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";

export const useMapbox = (containerRef) => {
   const [isReady, setIsReady] = useState(false);
   const [error, setError] = useState(null);
   const [userLocation, setUserLocation] = useState(null);

   const map = useRef(null);
   const markers = useRef([]);
   const geolocateControl = useRef(null); // ⭐ Control nativo de Mapbox

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

      // ⭐ CREAR GEOLOCATE CONTROL (como el componente desordenado)
      geolocateControl.current = new mapboxgl.GeolocateControl({
         positionOptions: {
            enableHighAccuracy: true, // Ubicación más precisa
         },
         trackUserLocation: true, // ⭐ SIGUE AL USUARIO EN TIEMPO REAL
         showUserHeading: true, // Muestra dirección del usuario
         showUserLocation: true, // Muestra punto de ubicación
         fitBoundsOptions: {
            maxZoom: 16, // Zoom máximo al centrar
         },
      });

      // ⭐ AÑADIR CONTROL AL MAPA
      map.current.addControl(geolocateControl.current, "top-right");

      // ⭐ EVENTOS DE GEOLOCALIZACIÓN
      geolocateControl.current.on("geolocate", (e) => {
         const location = [e.coords.longitude, e.coords.latitude];
         setUserLocation(location);
         console.log("Ubicación actualizada:", location);
      });

      geolocateControl.current.on("error", (e) => {
         console.error("Error de geolocalización:", e.message);
         setError("Error al obtener ubicación");
      });

      map.current.on("load", () => {
         setIsReady(true);
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
   }, [containerRef]);

   // ⭐ FUNCIÓN PARA ACTIVAR TRACKING MANUAL
   const startTracking = useCallback(() => {
      if (geolocateControl.current) {
         geolocateControl.current.trigger();
      }
   }, []);

   // ⭐ FUNCIÓN PARA IR AL USUARIO
   const goToUser = useCallback(() => {
      if (userLocation && map.current) {
         map.current.flyTo({
            center: userLocation,
            zoom: 16,
            duration: 1500,
         });
      } else {
         startTracking();
      }
   }, [userLocation, startTracking]);

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

   const setStyle = useCallback((style) => {
      if (map.current) {
         map.current.setStyle(style);
      }
   }, []);

   return {
      isReady,
      error,
      userLocation,
      startTracking,
      addMarkers,
      fitToMarkers,
      goToUser,
      setStyle,
   };
};
