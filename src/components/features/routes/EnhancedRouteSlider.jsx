// src/components/features/routes/EnhancedRouteSlider.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./EnhancedRouteSlider.module.css";

const EnhancedRouteSlider = ({ route, onClose, onShowCodeModal }) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      setIsVisible(true);
   }, []);

   const handleClose = () => {
      setIsVisible(false);
      setTimeout(onClose, 300);
   };

   return (
      <div className={`${styles.routeSlider} ${isVisible ? styles.visible : ""}`}>
         <div className={styles.sliderHandle} />

         <div className={styles.sliderHeader}>
            <h3>{route.title}</h3>
            <button onClick={handleClose}>✕</button>
         </div>

         <div className={styles.sliderContent}>
            <p>{route.description}</p>

            <div className={styles.routeActions}>
               {route.isUnlocked ? (
                  <button className={styles.primaryButton}>▶️ Empezar ruta</button>
               ) : (
                  <button className={styles.lockedButton} onClick={onShowCodeModal}>
                     🔒 Ingresa código
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

EnhancedRouteSlider.propTypes = {
   route: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      isUnlocked: PropTypes.bool.isRequired,
   }).isRequired,
   onClose: PropTypes.func.isRequired,
   onShowCodeModal: PropTypes.func.isRequired,
};

export default EnhancedRouteSlider;
