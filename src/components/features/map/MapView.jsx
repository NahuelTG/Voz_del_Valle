// src/components/features/map/MapView.jsx
import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";

import { useMapbox } from "../../../hooks/useMapbox";

import styles from "./MapView.module.css";

const ROUTE_MARKERS = [
   {
      id: 1,
      name: "Inicio de Ruta - Sonido",
      coordinates: [-66.175231, -17.366733],
      icon: "🏁",
      unlocked: true,
   },
   {
      id: 2,
      name: "Duende",
      coordinates: [-66.174238, -17.36632],
      icon: "AR",
      type: "ar",
      unlocked: true,
   },
   {
      id: 3,
      name: "Lavadero y sonidos del agua",
      coordinates: [-66.167676, -17.365103],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 4,
      name: "Pasaje escudaño",
      coordinates: [-66.169489, -17.364428],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 5,
      name: "Puente de colores",
      coordinates: [-66.15892, -17.368894],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 6,
      name: "Amerinst",
      coordinates: [-66.155583, -17.36993],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 7,
      name: "Parque Fidel Anze",
      coordinates: [-66.152753, -17.370765],
      icon: "AR",
      type: "ar",
      unlocked: true,
   },
   {
      id: 8,
      name: "El Pueblito",
      coordinates: [-66.139431, -17.374837],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 9,
      name: "El puente",
      coordinates: [-66.138117, -17.377397],
      icon: "AR",
      type: "ar",
      unlocked: true,
   },
   {
      id: 10,
      name: " Casa de Piedra",
      coordinates: [-66.141846, -17.382329],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 11,
      name: "Mirador 1",
      coordinates: [-66.140543, -17.387445],
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 12,
      name: "Mirador 2 - final",
      coordinates: [-66.132983, -17.400934],
      icon: "🎵",
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
   const navigate = useNavigate();
   const mapContainer = useRef(null);

   const { isReady, error, userLocation, addMarkers, fitToMarkers, goToUser, setStyle } = useMapbox(mapContainer);

   const handleMarkerClick = useCallback(
      (marker) => {
         if (marker.type === "ar" && marker.unlocked) {
            navigate("/ar/lobo");
         } else {
            console.log("Marcador clickeado:", marker.name);
         }
      },
      [navigate]
   );

   useEffect(() => {
      if (!isReady) return;

      const mapboxMarkers = ROUTE_MARKERS.map((marker) => {
         const element = document.createElement("div");
         element.className = styles.customMarker;
         element.style.cursor = marker.unlocked ? "pointer" : "default";

         element.innerHTML = `
            <div class="${styles.markerIcon} ${marker.unlocked ? styles.unlocked : styles.locked}">
               ${marker.icon}
            </div>
         `;

         if (marker.unlocked) {
            element.addEventListener("click", () => handleMarkerClick(marker));
         }

         const popupContent = `
            <div class="${styles.popupContent}">
               <h3>${marker.name}</h3>
               <p>${marker.unlocked ? "✅ Disponible" : "🔒 Bloqueada"}</p>
               ${marker.type === "ar" && marker.unlocked ? "<p>🎮 Toca para iniciar AR</p>" : ""}
            </div>
         `;

         return {
            coordinates: marker.coordinates,
            element,
            popupContent,
         };
      });

      addMarkers(mapboxMarkers);
   }, [isReady, addMarkers, navigate, handleMarkerClick]);

   if (error) {
      return (
         <div className={styles.mapView}>
            <div className={styles.mapPlaceholder}>
               <div className={styles.fallbackMessage}>
                  <h3>🗺️ Vista básica</h3>
                  <p>{error}</p>
               </div>
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
               </div>
            </div>
         )}

         {/* ⭐ CONTROLES SIMPLIFICADOS - El GeolocateControl ya está en el mapa */}
         {isReady && (
            <div className={styles.mapControls}>
               {/* Botón adicional para ir al usuario (opcional, ya tienes el control nativo) */}
               {userLocation && (
                  <button className={styles.controlButton} onClick={goToUser} title="Ir a mi ubicación">
                     📍
                  </button>
               )}

               <button className={styles.controlButton} onClick={fitToMarkers} title="Ver todos los marcadores">
                  🗺️
               </button>

               <button
                  className={styles.controlButton}
                  onClick={() => setStyle("mapbox://styles/mapbox/satellite-v9")}
                  title="Vista satelital"
               >
                  🛰️
               </button>
            </div>
         )}
      </div>
   );
};

export default MapView;
