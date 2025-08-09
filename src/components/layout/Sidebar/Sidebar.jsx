// src/components/layout/Sidebar/Sidebar.jsx
import PropTypes from "prop-types";

import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, onClose, routes, onRouteSelect }) => {
   return (
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
         <div className={styles.header}>
            <h2>Menú Rápido</h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar menú">
               ✕
            </button>
         </div>

         <div className={styles.main}>
            <div className={styles.quickRoutes}>
               <h3>Acceso Rápido</h3>
               {routes.slice(0, 2).map((route) => (
                  <button
                     key={route.id}
                     className={`${styles.quickRouteItem} ${!route.isUnlocked ? styles.locked : ""}`}
                     onClick={() => onRouteSelect(route)}
                  >
                     <div className={styles.quickRouteInfo}>
                        <h4>{route.title}</h4>
                        <span className={styles.quickRouteMeta}>{route.isUnlocked ? `⏱️ ${route.duration}` : "🔒 Bloqueada"}</span>
                     </div>
                     <span className={styles.quickRouteArrow}>→</span>
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
};

Sidebar.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   routes: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
         title: PropTypes.string.isRequired,
         duration: PropTypes.string,
         isUnlocked: PropTypes.bool,
      })
   ).isRequired,
   onRouteSelect: PropTypes.func.isRequired,
};

export default Sidebar;
