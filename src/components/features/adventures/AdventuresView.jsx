// src/components/features/adventures/AdventuresView.jsx
import PropTypes from "prop-types";

import styles from "./AdventuresView.module.css";

const AdventuresView = ({ routes, achievements }) => {
   const completedRoutes = routes.filter((r) => r.stats.photos > 0);

   return (
      <div className={styles.adventuresView}>
         <div className={styles.viewHeader}>
            <h2>Mis Aventuras</h2>
            <p>Tu progreso y logros</p>
         </div>

         <div className={styles.statsOverview}>
            <div className={styles.statCard}>
               <span>🏃‍♂️</span>
               <span>{completedRoutes.length}</span>
               <span>Rutas Completadas</span>
            </div>
         </div>

         <div className={styles.achievements}>
            <h3>Logros</h3>
            <div className={styles.achievementsGrid}>
               {achievements.map((achievement) => (
                  <div key={achievement.id} className={styles.achievementCard}>
                     <span>{achievement.icon}</span>
                     <span>{achievement.name}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

AdventuresView.propTypes = {
   routes: PropTypes.arrayOf(
      PropTypes.shape({
         stats: PropTypes.shape({
            photos: PropTypes.number.isRequired,
         }).isRequired,
      })
   ).isRequired,
   achievements: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
         icon: PropTypes.node.isRequired,
         name: PropTypes.string.isRequired,
      })
   ).isRequired,
};

export default AdventuresView;
