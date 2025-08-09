// src/components/features/map/MapView.jsx
import PropTypes from "prop-types";

import styles from "./MapView.module.css";

const ROUTE_MARKERS = [
   {
      id: 1,
      name: "Ruta Sonora",
      position: { top: "30%", left: "40%" },
      icon: "🎵",
      unlocked: true,
   },
   {
      id: 2,
      name: "Caminos de Memoria",
      position: { top: "60%", left: "70%" },
      icon: "🔒",
      unlocked: false,
   },
   {
      id: 3,
      name: "Ecos del Pasado",
      position: { top: "45%", left: "25%" },
      icon: "🔒",
      unlocked: false,
   },
];

const RouteMarker = ({ marker }) => (
   <div className={styles.routeMarker} style={marker.position}>
      <div className={`${styles.markerIcon} ${marker.unlocked ? styles.unlocked : styles.locked}`}>{marker.icon}</div>
      <div className={styles.markerLabel}>{marker.name}</div>
   </div>
);

const MapView = () => {
   return (
      <div className={styles.mapView}>
         <div className={styles.mapPlaceholder}>
            <div className={styles.mapMarker}>
               <div className={styles.markerPulse} />
            </div>

            {ROUTE_MARKERS.map((marker) => (
               <RouteMarker key={marker.id} marker={marker} />
            ))}
         </div>
      </div>
   );
};

RouteMarker.propTypes = {
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

export default MapView;
