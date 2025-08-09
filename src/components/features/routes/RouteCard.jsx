// src/components/features/routes/RouteCard.jsx
import PropTypes from "prop-types";

import styles from "./RouteCard.module.css";

const RouteCard = ({ route, onClick }) => {
   return (
      <div className={`${styles.routeCard} ${!route.isUnlocked ? styles.locked : ""}`} onClick={() => onClick(route)}>
         <div className={styles.cardHeader}>
            <h3>{route.title}</h3>
            {!route.isUnlocked && <span className={styles.lockIcon}>🔒</span>}
         </div>

         <p className={styles.cardDescription}>{route.description}</p>

         <div className={styles.cardMeta}>
            <span className={styles.metaItem}>⏱️ {route.duration}</span>
            <span className={styles.metaItem}>📍 {route.distance}</span>
            <span className={`${styles.metaItem} ${styles.difficulty}`}>{route.difficulty}</span>
         </div>

         <div className={styles.cardProgress}>
            {route.isUnlocked ? (
               <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: route.stats.photos > 0 ? "100%" : "0%" }} />
               </div>
            ) : (
               <div className={styles.unlockHint}>Toca para ingresar código</div>
            )}
         </div>
      </div>
   );
};

RouteCard.propTypes = {
   route: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      duration: PropTypes.string,
      distance: PropTypes.string,
      difficulty: PropTypes.string,
      isUnlocked: PropTypes.bool.isRequired,
      stats: PropTypes.shape({
         photos: PropTypes.number.isRequired,
      }).isRequired,
   }).isRequired,
   onClick: PropTypes.func.isRequired,
};

export default RouteCard;
