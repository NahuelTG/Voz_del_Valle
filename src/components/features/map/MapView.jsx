// src/components/features/map/MapView.jsx
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";

import { useMapbox } from "../../../hooks/useMapbox";

import styles from "./MapView.module.css";

const ROUTE_MARKERS = [
   {
      id: 1,
      name: "Ruta Sonora",
      coordinates: [-66.1568, -17.3895],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 2,
      name: "Caminos de Memoria",
      coordinates: [-66.1468, -17.3795],
      icon: "🔒",
      unlocked: false,
   },
   {
      id: 3,
      name: "Ecos del Pasado",
      coordinates: [-66.1668, -17.3995],
      icon: "🔒",
      unlocked: false,
   },
   {
      id: 4,
      name: "Lobo del Valle",
      coordinates: [-66.1668, -17.3695],
      icon: "AR",
      unlocked: true,
   },
];

const FallbackMarker = ({ marker }) => (
   <div className={styles.routeMarker} style={marker.position}>
      <div className={`${styles.markerIcon} ${marker.unlocked ? styles.unlocked : styles.locked}`}>{marker.icon}</div>
      <div className={styles.markerLabel}>{marker.name}</div>
   </div>
);

FallbackMarker.propTypes = {
   marker: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.shape({
         top: PropTypes.string.isRequired,
         left: PropTypes.string.isRequired,
      }).isRequired,
      icon: PropTypes.node.isRequired,
      unlocked: PropTypes.bool.isRequired,
   }).isRequired,
};

const MapView = () => {
   const mapContainer = useRef(null);
   const { isReady, error, userLocation, addMarkers, fitToMarkers, goToUser, setStyle } = useMapbox(mapContainer);

   useEffect(() => {
      if (!isReady) return;

      const mapboxMarkers = ROUTE_MARKERS.map((marker) => {
         const element = document.createElement("div");
         element.className = styles.customMarker;
         element.innerHTML = `
            <div class="${styles.markerIcon} ${marker.unlocked ? styles.unlocked : styles.locked}">
               ${marker.icon}
            </div>
         `;

         const popupContent = `
            <div class="${styles.popupContent}">
               <h3>${marker.name}</h3>
               <p>${marker.unlocked ? "✅ Disponible" : "🔒 Bloqueada"}</p>
            </div>
         `;

         return {
            coordinates: marker.coordinates,
            element,
            popupContent,
         };
      });

      addMarkers(mapboxMarkers);
   }, [isReady, addMarkers]);

   if (error) {
      return (
         <div className={styles.mapView}>
            <div className={styles.mapPlaceholder}>
               <div className={styles.fallbackMessage}>
                  <h3>🗺️ Vista básica</h3>
                  <p>{error}</p>
               </div>
               {ROUTE_MARKERS.map((marker) => (
                  <FallbackMarker key={marker.id} marker={marker} />
               ))}
            </div>
         </div>
      );
   }

   return (
      <div className={styles.mapView}>
         <div ref={mapContainer} className={styles.mapContainer} style={{ width: "100%", height: "100%" }} />

         {!isReady && (
            <div className={styles.loadingOverlay}>
               <div className={styles.loadingContainer}>
                  <div className={styles.spinner}></div>
                  <p>Cargando mapa...</p>
                  <small>Obteniendo tu ubicación...</small>
               </div>
            </div>
         )}

         {isReady && (
            <div className={styles.mapControls}>
               {userLocation && (
                  <button className={styles.controlButton} onClick={goToUser}>
                     📍
                  </button>
               )}
               <button className={styles.controlButton} onClick={fitToMarkers}>
                  🎯
               </button>
               <button className={styles.controlButton} onClick={() => setStyle("mapbox://styles/mapbox/satellite-v9")}>
                  🛰️
               </button>
            </div>
         )}
      </div>
   );
};

export default MapView;
