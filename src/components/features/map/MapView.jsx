// src/components/features/map/MapView.jsx - Con marcadores AR específicos
import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";

import { useMapbox } from "../../../hooks/useMapbox";

import styles from "./MapView.module.css";

// Marcadores actualizados con diferentes tipos AR
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
      name: "Lobo del Valle",
      coordinates: [-66.174238, -17.36632],
      icon: "🐺",
      type: "ar",
      arModel: "lobo", // ⭐ Tipo específico
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
      name: "Duende Mágico",
      coordinates: [-66.152753, -17.370765],
      icon: "🧚‍♂️",
      type: "ar",
      arModel: "duende", // ⭐ Tipo específico
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
      name: "Murciélago Nocturno",
      coordinates: [-66.138117, -17.377397],
      icon: "🦇",
      type: "ar",
      arModel: "murcielago", // ⭐ Tipo específico
      unlocked: true,
   },
   {
      id: 10,
      name: "Casa de Piedra",
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

// Función para obtener ruta AR según el modelo
const getARRoute = (arModel) => {
   const routes = {
      lobo: "/ar/lobo",
      wolf: "/ar/lobo",
      duende: "/ar/duende",
      gnome: "/ar/duende",
      murcielago: "/ar/murcielago",
      bat: "/ar/murcielago",
   };

   return routes[arModel.toLowerCase()] || "/ar/lobo";
};

// Función para obtener descripción del modelo AR
const getARDescription = (arModel) => {
   const descriptions = {
      lobo: "🐺 Experimenta la realidad aumentada con el Lobo del Valle",
      duende: "🧚‍♂️ Descubre la magia del Duende en AR",
      murcielago: "🦇 Vuela con el Murciélago Nocturno en AR",
   };

   return descriptions[arModel.toLowerCase()] || "🎮 Experiencia de realidad aumentada";
};

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
         if (marker.type === "ar" && marker.unlocked && marker.arModel) {
            // Navegar a la ruta AR específica según el modelo
            const arRoute = getARRoute(marker.arModel);
            console.log(`🎮 Navegando a AR: ${marker.arModel} → ${arRoute}`);
            navigate(arRoute);
         } else if (marker.type === "ar" && marker.unlocked) {
            // Fallback para marcadores AR sin modelo específico
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

         // Añadir clase específica para marcadores AR
         if (marker.type === "ar") {
            element.classList.add(styles.arMarker);
         }

         element.innerHTML = `
            <div class="${styles.markerIcon} ${marker.unlocked ? styles.unlocked : styles.locked}">
               ${marker.icon}
            </div>
         `;

         if (marker.unlocked) {
            element.addEventListener("click", () => handleMarkerClick(marker));
         }

         // Contenido del popup con información específica
         let popupContent = `
            <div class="${styles.popupContent}">
               <h3>${marker.name}</h3>
               <p>${marker.unlocked ? "✅ Disponible" : "🔒 Bloqueada"}</p>
         `;

         // Añadir información específica para marcadores AR
         if (marker.type === "ar" && marker.unlocked && marker.arModel) {
            popupContent += `
               <p>${getARDescription(marker.arModel)}</p>
               <p><strong>🎮 Toca para iniciar AR</strong></p>
            `;
         } else if (marker.type === "ar" && marker.unlocked) {
            popupContent += `<p>🎮 Toca para iniciar AR</p>`;
         }

         popupContent += `</div>`;

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

         {/* Controles del mapa */}
         {isReady && (
            <div className={styles.mapControls}>
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
