// src/components/features/routes/RoutesView.jsx
import PropTypes from "prop-types";

import styles from "./RoutesView.module.css";

const RoutesView = ({ routes, onRouteSelect }) => {
   return (
      <div className={styles.routesView}>
         <div className={styles.viewHeader}>
            <h2>Rutas Disponibles</h2>
            <p>Descubre experiencias únicas</p>
         </div>

         <div className={styles.routesGrid}>
            {routes.map((route) => (
               <div
                  key={route.id}
                  className={`${styles.routeCard} ${!route.isUnlocked ? styles.locked : ""}`}
                  onClick={() => onRouteSelect(route)}
               >
                  <div className={styles.cardHeader}>
                     <h3>{route.title}</h3>
                     {!route.isUnlocked && <span>🔒</span>}
                  </div>
                  <p>{route.description}</p>
                  <div className={styles.cardMeta}>
                     <span>⏱️ {route.duration}</span>
                     <span>📍 {route.distance}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

RoutesView.propTypes = {
   routes: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
         title: PropTypes.string.isRequired,
         description: PropTypes.string,
         duration: PropTypes.string,
         distance: PropTypes.string,
         isUnlocked: PropTypes.bool.isRequired,
      })
   ).isRequired,
   onRouteSelect: PropTypes.func.isRequired,
};

export default RoutesView;
